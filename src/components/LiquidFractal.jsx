import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`

const fragmentShader = `
  uniform sampler2D uTexture;
  uniform vec2 uResolution;
  uniform vec2 uImageResolution;
  uniform vec2 uMouse;
  uniform float uTime;
  uniform float uActive;
  uniform float uMonochrome;
  uniform float uIntensity;
  uniform vec3 uAccent;
  varying vec2 vUv;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  float noise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
               mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
  }

  float fbm(vec2 p) {
    float v = 0.0, a = 0.5;
    for (int i = 0; i < 5; i++) {
      v += a * noise(p);
      p = p * 2.03 + vec2(7.1, 11.3);
      a *= 0.5;
    }
    return v;
  }

  vec2 coverUV(vec2 uv) {
    float screenAspect = uResolution.x / uResolution.y;
    float imageAspect = uImageResolution.x / uImageResolution.y;
    vec2 scale = vec2(1.0);
    if (screenAspect > imageAspect) scale.y = imageAspect / screenAspect;
    else scale.x = screenAspect / imageAspect;
    return (uv - 0.5) * scale + 0.5;
  }

  void main() {
    vec2 uv = vUv;
    vec2 p = uv;
    float aspect = uResolution.x / uResolution.y;
    p.x *= aspect;
    vec2 m = uMouse;
    m.x *= aspect;
    vec2 delta = p - m;

    // Localized falloff around the pointer. Exactly zero when not hovering.
    float radius = exp(-dot(delta, delta) * 16.0) * uActive;
    // Tighter falloff for the pointer glow so it covers less area.
    float glowRadius = exp(-dot(delta, delta) * 55.0) * uActive;

    vec2 displacement = vec2(0.0);
    if (radius > 0.00001) {
      float t = uTime * 0.32;
      vec2 field = p * 5.0;
      vec2 warp = vec2(
        fbm(field + vec2(t, -t * 0.3)),
        fbm(field + vec2(-t * 0.4, t))
      ) - 0.5;
      displacement = (warp * 0.085 + delta * 0.065) * radius * uIntensity;
    }

    vec2 texUV = clamp(coverUV(uv) + displacement, vec2(0.001), vec2(0.999));
    vec3 sampled = texture2D(uTexture, texUV).rgb;

    // Keep the original palette by default, with an optional grayscale mode.
    float gray = dot(sampled, vec3(0.2126, 0.7152, 0.0722));
    vec3 color = mix(sampled, vec3(gray), uMonochrome);

    // Subtle brand-colored glow inside the liquid area.
    color += uAccent * glowRadius * 0.2 * uIntensity;

    gl_FragColor = vec4(color, 1.0);
    #include <colorspace_fragment>
  }
`

const MOBILE_QUERY = '(max-width: 639px)'

export default function LiquidFractal({
  imageUrl,
  portraitImageUrl,
  accent = '#E8E8E8',
  monochrome = false,
  intensity = 1,
  className = '',
}) {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container || !imageUrl) return

    let renderer
    let material
    let texture
    let resizeObserver
    let visibilityObserver
    let animationId
    let disposed = false
    let isVisible = true
    let loadId = 0

    const clock = new THREE.Clock()
    const mouse = new THREE.Vector2(-10, -10)
    let targetActive = 0
    let currentActive = 0

    const mobileQuery = window.matchMedia(MOBILE_QUERY)
    const hoverQuery = window.matchMedia('(hover: hover)')
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    const resolveImageUrl = () =>
      portraitImageUrl && mobileQuery.matches ? portraitImageUrl : imageUrl

    const scene = new THREE.Scene()
    const camera = new THREE.Camera()
    const geometry = new THREE.PlaneGeometry(2, 2)

    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: false,
        powerPreference: 'high-performance',
        precision: 'highp',
      })

      // Render at native device resolution (up to 2x for sharp Retina displays).
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
      renderer.outputColorSpace = THREE.SRGBColorSpace
      renderer.toneMapping = THREE.NoToneMapping
      renderer.setClearColor(0x050505, 1)
    } catch (error) {
      console.error('WebGL initialization failed; keeping the static background.', error)
      geometry.dispose()
      return
    }

    const canvas = renderer.domElement
    canvas.setAttribute('aria-hidden', 'true')

    material = new THREE.ShaderMaterial({
      uniforms: {
        uTexture: { value: null },
        uResolution: { value: new THREE.Vector2(1, 1) },
        uImageResolution: { value: new THREE.Vector2(1, 1) },
        uMouse: { value: mouse },
        uTime: { value: 0 },
        uActive: { value: 0 },
        uMonochrome: { value: monochrome ? 1 : 0 },
        uIntensity: { value: intensity },
        uAccent: { value: new THREE.Color(accent) },
      },
      vertexShader,
      fragmentShader,
      precision: 'highp',
    })

    scene.add(new THREE.Mesh(geometry, material))

    function resize() {
      const width = container.clientWidth
      const height = container.clientHeight
      if (!width || !height) return

      renderer.setSize(width, height, false)
      material.uniforms.uResolution.value.set(width, height)
      render()
    }

    function render() {
      if (!material?.uniforms.uTexture.value) return
      material.uniforms.uTime.value = clock.getElapsedTime()
      material.uniforms.uActive.value = currentActive
      renderer.render(scene, camera)
    }

    function animate() {
      if (disposed) return
      animationId = requestAnimationFrame(animate)

      // Skip drawing while the hero is offscreen or the tab is hidden.
      if (!isVisible || document.hidden) return

      const easing = 1 - Math.exp(-clock.getDelta() * 7)
      currentActive += (targetActive - currentActive) * easing
      if (currentActive < 0.00001) currentActive = 0
      render()
    }

    function handleImageLoaded(loadedTexture) {
      if (disposed) {
        loadedTexture.dispose()
        return
      }

      loadedTexture.colorSpace = THREE.SRGBColorSpace
      loadedTexture.minFilter = THREE.LinearMipmapLinearFilter
      loadedTexture.magFilter = THREE.LinearFilter
      loadedTexture.generateMipmaps = true
      loadedTexture.anisotropy = renderer.capabilities.getMaxAnisotropy()

      texture?.dispose()
      texture = loadedTexture

      material.uniforms.uTexture.value = texture
      material.uniforms.uImageResolution.value.set(
        texture.image.width,
        texture.image.height
      )

      if (!canvas.isConnected) {
        container.appendChild(canvas)
      }

      resize()
      if (!animationId) animate()
    }

    function loadTexture() {
      const url = resolveImageUrl()
      if (!url) return

      const requestId = ++loadId
      new THREE.TextureLoader().load(
        url,
        (loadedTexture) => {
          if (requestId !== loadId) {
            loadedTexture.dispose()
            return
          }
          handleImageLoaded(loadedTexture)
        },
        undefined,
        (error) => {
          if (requestId === loadId) {
            console.error('Failed to load liquid fractal background:', error)
          }
        }
      )
    }

    function handleMediaChange() {
      loadTexture()
    }

    function handlePointerMove(event) {
      if (event.pointerType && event.pointerType !== 'mouse' && event.pointerType !== 'pen') {
        return
      }

      const rect = container.getBoundingClientRect()
      const inside =
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom

      if (!inside) {
        targetActive = 0
        return
      }

      mouse.set(
        (event.clientX - rect.left) / rect.width,
        1 - (event.clientY - rect.top) / rect.height
      )
      targetActive = 1
    }

    function deactivate() {
      targetActive = 0
    }

    loadTexture()

    resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(container)

    visibilityObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting
    })
    visibilityObserver.observe(container)

    mobileQuery.addEventListener('change', handleMediaChange)

    if (hoverQuery.matches && !reducedMotionQuery.matches) {
      document.addEventListener('pointermove', handlePointerMove, { passive: true })
      window.addEventListener('blur', deactivate)
      window.addEventListener('scroll', deactivate, { passive: true, capture: true })
      document.documentElement.addEventListener('mouseleave', deactivate)
    }

    return () => {
      disposed = true
      loadId += 1
      cancelAnimationFrame(animationId)
      resizeObserver?.disconnect()
      visibilityObserver?.disconnect()
      mobileQuery.removeEventListener('change', handleMediaChange)

      document.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('blur', deactivate)
      window.removeEventListener('scroll', deactivate, { capture: true })
      document.documentElement.removeEventListener('mouseleave', deactivate)

      texture?.dispose()
      material?.dispose()
      geometry.dispose()
      renderer?.dispose()

      if (canvas.parentNode === container) {
        container.removeChild(canvas)
      }
    }
  }, [imageUrl, portraitImageUrl, accent, monochrome, intensity])

  return (
    <div
      ref={containerRef}
      className={`liquid-fractal-bg ${className}`.trim()}
      aria-hidden="true"
    >
      <picture className="liquid-fractal-fallback">
        {portraitImageUrl ? (
          <source media={MOBILE_QUERY} srcSet={portraitImageUrl} />
        ) : null}
        <img src={imageUrl} alt="" aria-hidden="true" />
      </picture>
    </div>
  )
}

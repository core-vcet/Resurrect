export const toKebab = (value) => value.replace(/[A-Z]/g, (char) => `-${char.toLowerCase()}`)

export function themeToCssVariables(theme) {
  const variables = {}

  Object.entries(theme.colors ?? {}).forEach(([key, value]) => {
    variables[`--${toKebab(key)}`] = value
  })

  Object.entries(theme.fonts ?? {}).forEach(([key, value]) => {
    variables[`--brand-font-${toKebab(key)}`] = value
  })

  return variables
}

export function applyTheme(config, root = document.documentElement) {
  Object.entries(themeToCssVariables(config.theme)).forEach(([key, value]) => {
    root.style.setProperty(key, value)
  })

  document.title = config.meta.title

  const description = document.querySelector('meta[name="description"]')
  if (description) {
    description.setAttribute('content', config.meta.description)
  }

  document.querySelectorAll('link[rel~="icon"], link[rel="apple-touch-icon"]').forEach((link) => {
    link.setAttribute('href', config.brand.favicon)
  })
}

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import '@fontsource/material-icons'
import './index.css'
import App from './App.jsx'
import { siteConfig } from './config/site.config.js'
import { applyTheme } from './config/applyTheme.js'

applyTheme(siteConfig)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <MotionConfig reducedMotion="user">
        <App />
      </MotionConfig>
      <Analytics />
      <SpeedInsights />
    </BrowserRouter>
  </StrictMode>,
)

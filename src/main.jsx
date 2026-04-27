import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import store from './redux/store'
import { ThemeProvider } from './context/ThemeContext'
import ToastManager from './components/ToastManager'
import AppRoutes from './routes/AppRoutes'
import './index.css'
import { getDomainShortName } from './utils/domainUtils'

const domainName = getDomainShortName()
document.title = domainName

const iconElement = document.querySelector('link[rel="icon"]')
const iconUrl = iconElement ? iconElement.getAttribute('href') : '/favicon.svg'

const dynamicManifest = {
  name: domainName,
  short_name: domainName,
  description: `${domainName} Progressive Web App`,
  orientation: 'portrait-primary',
  start_url: '.',
  display: 'standalone',
  background_color: '#ffffff',
  theme_color: '#ffffff',
  icons: [
    {
      src: iconUrl,
      sizes: 'any',
      type: 'image/svg+xml',
      purpose: 'any maskable'
    }
  ]
}

const blob = new Blob([JSON.stringify(dynamicManifest)], { type: 'application/json' })
const manifestURL = URL.createObjectURL(blob)

const manifestElement = document.querySelector('link[rel="manifest"]')
if (manifestElement) {
  manifestElement.href = manifestURL
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then((registration) => {
        console.log('Service worker registered:', registration)
      })
      .catch((error) => {
        console.warn('Service worker registration failed:', error)
      })
  })
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider>
          <AppRoutes />
          <ToastManager />
          <ToastContainer position="bottom-right" autoClose={2500} />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)

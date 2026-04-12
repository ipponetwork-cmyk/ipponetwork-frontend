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

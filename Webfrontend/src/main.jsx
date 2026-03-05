import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from "./Context/AuthProvider.jsx"
import axios from 'axios'
import { setupAxiosInterceptors } from './config/apiConfig.js'

// Setup axios to handle API URLs correctly in both dev and production
setupAxiosInterceptors(axios)

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>,
)

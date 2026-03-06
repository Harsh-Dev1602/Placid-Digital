import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from "./Context/AuthProvider.jsx"
import { LoadingProvider, useLoading } from "./Context/LoadingProvider.jsx"
import axios from 'axios'
import { setupAxiosInterceptors } from './config/apiConfig.js'
import { setLoadingHandler } from './Services/api.js'
import React from 'react'

// Setup axios to handle API URLs correctly in both dev and production
setupAxiosInterceptors(axios)

// Wrapper component to initialize loading handler
const AppWrapper = () => {
  const [, setIsLoading] = useLoading();

  // Set the global loading handler once
  React.useEffect(() => {
    setLoadingHandler(setIsLoading);
  }, [setIsLoading]);

  return <App />;
};

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <LoadingProvider>
      <AuthProvider>
        <AppWrapper />
      </AuthProvider>
    </LoadingProvider>
  </BrowserRouter>,
)

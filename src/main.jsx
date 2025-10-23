import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import Router from './Router/Router.jsx'
import 'aos/dist/aos.css';
import AOS from 'aos';
import AuthProvider from './Context/AuthContext/AuthProvider.jsx'



AOS.init()


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider> 
    <RouterProvider router={Router}>
    </RouterProvider>
    </AuthProvider>
  </StrictMode>,
)

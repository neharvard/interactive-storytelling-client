import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import App from './App.jsx'
import './index.css'

import { RouterProvider } from 'react-router-dom'
import router from './routes/routes.jsx'
import AuthProvider from './pages/Providers/AuthProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    <AuthProvider>
       <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
   
  </StrictMode>,
)

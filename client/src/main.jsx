import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom';
import router from './router/router.jsx';
import DocumentProvider from './context/DocumentContext.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
    
    <DocumentProvider>
        <RouterProvider router={router} />
    </DocumentProvider>
)
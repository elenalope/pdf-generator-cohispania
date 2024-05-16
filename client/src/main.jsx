import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom';
import router from './router/router';
import DocumentProvider from './context/DocumentContext.jsx';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';



ReactDOM.createRoot(document.getElementById('root')).render(
    
    <DocumentProvider>
        <RouterProvider router={router} />
    </DocumentProvider>
);
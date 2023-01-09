import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './routes/Home';
import Error from './routes/Error';
import './styles/global.css';
import { createBrowserHistory } from '@remix-run/router';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
    {
        path: "/",
        element: (<Home/>),
        errorElement: <Error/>
    }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
);

import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './routes/Home';
import Error from './routes/Error';
import './styles/global.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from './routes/Login';
import Register from './routes/Register';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home/>,
        errorElement: <Error/>
    },
    {
        path: '/login',
        element: <Login/>,
        errorElement: <Error/>
    },
    {
        path: '/register',
        element: <Register/>,
        errorElement: <Error/>
    }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
);

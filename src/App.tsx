import React from 'react';	
import './styles/App.css';	
import './components/TextField';	
import './styles/global.css';
import Home from './routes/Home';
import Error from './routes/Error';
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

const App: React.FC = () => {	
    return (	
        <div className="App font-bold text-green-200">	
            <RouterProvider router={router} />
        </div>	
    );	
};	

export default App;	

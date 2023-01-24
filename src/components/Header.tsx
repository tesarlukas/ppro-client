import React from 'react';
import { Link } from 'react-router-dom';

export const Header: React.FC = () => {

    return <header className="flex bg-amber-500 w-screen h-48 justify-between items-center p-4">
        <h1 className="text-white">Movie Database</h1>
        <div>
            <Link className="text-white" to="/login">Login</Link>
            <Link className="text-white" to="/register">Register</Link>
        </div>
    </header>;
};

export default Header;
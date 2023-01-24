import React from 'react';
import { Link } from 'react-router-dom';

export const Header: React.FC = () => {
    return (
        <header className="flex bg-white w-screen h-24 justify-between items-center p-4">
            <h1 className="text-black">Movie Database</h1>
            <div>
                <Link className="text-black p-2 text-lg" to="/login">
                    Login
                </Link>
                <Link className="text-black p-2 text-lg" to="/register">
                    Register
                </Link>
            </div>
        </header>
    );
};

export default Header;

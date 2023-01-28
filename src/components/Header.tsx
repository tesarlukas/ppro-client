import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context';

export const Header: React.FC = () => {
    const { user, setUser } = useContext(UserContext);

    const logout = (): void => {
        document.cookie = `${user.name}= ; expires = Thu, 01 Jan 1970 00:00:00 GMT`;
        setUser({ name: '', role: '' });
    };

    return (
        <header className="flex bg-white w-screen h-24 justify-between items-center p-4 shadow-md">
            <Link to="/">
                <h1 className="text-black">Movie Database</h1>
            </Link>
            <nav className="flex">
                <Link className="text-black p-2 text-lg" to="/filmworks">
                    Listing
                </Link>
                {user.name === '' ? (
                    <>
                        <Link className="text-black p-2 text-lg" to="/login">
                            Login
                        </Link>
                        <Link className="text-black p-2 text-lg" to="/register">
                            Register
                        </Link>
                    </>
                ) : (
                    <>
                        <div className="text-black p-2 text-lg">
                            Logged as{' '}
                            <Link to={'/'} className="text-blue-600">
                                {user.name}
                            </Link>
                        </div>
                        <button onClick={logout}>Logout</button>
                    </>
                )}
            </nav>
        </header>
    );
};

export default Header;

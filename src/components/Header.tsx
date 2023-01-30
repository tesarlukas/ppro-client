import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context';
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
import { DecodedToken } from '../shared/types';
import { toast } from 'react-toastify';

export const Header: React.FC = () => {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const logout = (): void => {
        Cookies.remove('auth');
        setUser({ id: 0, name: '', role: '' });
        navigate('/');
        toast('Logged out');
    };

    useEffect(() => {
        if (Cookies.get('auth')) {
            const userData: DecodedToken = jwt_decode(
                Cookies.get('auth') as string,
            );
            setUser({
                id: userData.id,
                name: userData.sub,
                role: userData.role,
            });
        }
    }, []);

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
                            <Link
                                to={`/user/${user.id}`}
                                className="text-blue-600"
                            >
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

import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context';

export const Header: React.FC = () => {
    const { user } = useContext(UserContext);
    // const [user, setUser] = useState<string>(document.cookie.split('=')[0]);
    // console.log(user);

    // useEffect(() => {
    //     setUser(document.cookie.split('=')[0]);
    //     console.log('ahoj');
    // }, [user]);

    return (
        <header className="flex bg-white w-screen h-24 justify-between items-center p-4 shadow-md">
            <Link to="/">
                <h1 className="text-black">Movie Database</h1>
            </Link>
            <nav>
                <Link className="text-black p-2 text-lg" to="/filmworks">
                    Listing
                </Link>
                <Link className="text-black p-2 text-lg" to="/login">
                    Login
                    {user}
                </Link>
                <Link className="text-black p-2 text-lg" to="/register">
                    Register
                </Link>
            </nav>
        </header>
    );
};

export default Header;

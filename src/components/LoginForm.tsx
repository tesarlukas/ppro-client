import React, { useContext, useState } from 'react';
import TextField from './TextField';
import {
    AuthenticationResponse,
    AuthUser,
    DecodedToken,
    LoginCredentials,
    LoginFormInterface,
} from '../shared/types';
import { tryLogin } from '../shared/api';
import { useNavigate } from 'react-router';
import { UserContext } from '../context';
import jwt_decode from 'jwt-decode';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

export const LoginForm: React.FC = () => {
    const [logged, setLogged] = useState<boolean>(true);
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);

    const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { password, username } = e.target as typeof e.target &
            LoginFormInterface;

        const credentials: LoginCredentials = {
            password: password.value,
            username: username.value,
        };

        try {
            const res = await tryLogin(credentials);
            const data: AuthenticationResponse = await res.json();
            Cookies.set('auth', data.token);

            if (data.token) {
                const decodedToken: DecodedToken = jwt_decode(data.token);
                const newUser: AuthUser = {
                    id: decodedToken.id,
                    name: decodedToken.sub,
                    role: decodedToken.role,
                };

                setUser(newUser);
                navigate('/');
                toast.success('Successfully logged in');
            } else {
                setLogged(false);
                toast.error('Wrong credentials');
            }
        } catch (error) {
            return;
        }
    };

    return (
        <form
            onSubmit={handleOnSubmit}
            className="flex flex-col bg-slate-800 p-4 rounded-xl mt-48"
        >
            <h3 className="text-2xl text-center p-2">Log in</h3>
            <h6>Username</h6>
            <TextField type="text" name="username" />
            <h6>Password</h6>
            <TextField type="password" name="password" />
            <input
                className="border border-slate-200 mt-4"
                type="submit"
                value="Login"
            ></input>
        </form>
    );
};

import React, { useContext, useState } from 'react';
import TextField from './TextField';
import { LoginCredentials, LoginFormInterface } from '../shared/types';
import { tryLogin } from '../shared/api';
import { useNavigate } from 'react-router';
import { UserContext } from '../context';

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

        type data = {
            token: string;
        };

        try {
            const res = await tryLogin(credentials);
            const data: data = await res.json();
            document.cookie = `${credentials.username}=${data.token}`;
            if (data.token) {
                setUser(credentials.username);
                navigate('/');
            } else {
                setLogged(false);
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
            <h6>Username</h6>
            <TextField type="text" name="username" />
            <h6>Password</h6>
            <TextField type="password" name="password" />
            <input
                className="border border-slate-200 mt-4"
                type="submit"
                value="Login"
            ></input>
            {logged ? (
                ''
            ) : (
                <h6 className="text-red-500 mt-1">Wrong credentials</h6>
            )}
        </form>
    );
};

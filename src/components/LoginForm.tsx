import React from 'react';
import TextField from './TextField';
import { LoginCredentials, LoginFormInterface } from '../shared/types';
import { tryLogin } from '../shared/api';

export const LoginForm: React.FC = () => {
    const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        const { password, username } = e.target as typeof e.target &
            LoginFormInterface;

        const credentials: LoginCredentials = {
            password: password.value,
            username: username.value,
        };

        tryLogin(credentials)
            .then((res) => console.log('Login was successful!', res.json()))
            .catch((err) => console.error(err));
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
        </form>
    );
};

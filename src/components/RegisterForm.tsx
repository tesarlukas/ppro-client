import React from 'react';
import { RegisterCredentials, RegisterFormInterface } from '../shared/types';
import { tryRegister } from '../shared/api';
import TextField from './TextField';

export const RegisterForm: React.FC = () => {
    const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        const { passwordRepeat, password, email, username } =
            e.target as typeof e.target & RegisterFormInterface;

        if (password.value !== passwordRepeat.value)
            return alert('Passwords do not match!');

        const credentials: RegisterCredentials = {
            email: email.value,
            password: password.value,
            username: username.value,
        };

        tryRegister(credentials)
            .then((res) => console.log('Register was successful!', res))
            .catch((err) => console.error(err));
    };

    return (
        <form onSubmit={handleOnSubmit} className="flex flex-col">
            <h6>Username</h6>
            <TextField type="text" name="username" />
            <h6>E-mail</h6>
            <TextField type="text" name="email" />
            <h6>New password</h6>
            <TextField type="password" name="password" />
            <h6>New password again</h6>
            <TextField type="password" name="passwordRepeat" />
            <input type="submit" value="Register"></input>
        </form>
    );
};

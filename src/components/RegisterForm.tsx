import React, { useState } from 'react';
import { RegisterCredentials, RegisterFormInterface } from '../shared/types';
import { tryRegister } from '../shared/api';
import TextField from './TextField';
import { useNavigate } from 'react-router-dom';

export const RegisterForm: React.FC = () => {
    const [registered, setRegistered] = useState<boolean>();
    const navigate = useNavigate();

    const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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

        try {
            const res = await tryRegister(credentials);
            const data = await res.json();
            setRegistered(true);
            setTimeout(() => {
                navigate('/login');
            }, 1000);

            if (data.token) console.log('happy');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="">
            <form
                onSubmit={handleOnSubmit}
                className="flex flex-col bg-slate-800 p-4 rounded-xl mt-48"
            >
                <h6>Username</h6>
                <TextField type="text" name="username" />
                <h6>E-mail</h6>
                <input
                    className="bg-slate-600 border-slate-300"
                    type="email"
                    name="email"
                />
                <h6>New password</h6>
                <TextField type="password" name="password" />
                <h6>New password again</h6>
                <TextField type="password" name="passwordRepeat" />
                <input
                    className="mt-4 border border-slate-300"
                    type="submit"
                    value="Register"
                ></input>
                {registered ? (
                    <h6 className="text-green-500">Successfully registered!</h6>
                ) : (
                    ''
                )}
            </form>
        </div>
    );
};

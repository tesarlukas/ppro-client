import {LoginCredentials, RegisterCredentials} from './types';

export const tryLogin = async (credentials: LoginCredentials) : Promise<Response> => {
    return fetch(`${import.meta.env.VITE_DEV_API_URL}api/v1/auth/authenticate`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    });
};

export const tryRegister = async (credentials: RegisterCredentials) : Promise<Response> => {
    return fetch(`${import.meta.env.VITE_DEV_API_URL}api/v1/auth/register`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    });
};

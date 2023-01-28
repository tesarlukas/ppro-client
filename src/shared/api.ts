import { da } from 'date-fns/locale';
import { LoginCredentials, Person, PersonFormData, RegisterCredentials } from './types';

export const tryLogin = async (
    credentials: LoginCredentials,
): Promise<Response> => {
    return fetch(
        `${import.meta.env.VITE_DEV_API_URL}api/v1/auth/authenticate`,
        {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        },
    );
};

export const tryRegister = async (
    credentials: RegisterCredentials,
): Promise<Response> => {
    return fetch(`${import.meta.env.VITE_DEV_API_URL}api/v1/auth/register`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    });
};

export const getPerson = async (id: number): Promise<Person> => {
    const res = await fetch(`${import.meta.env.VITE_DEV_API_URL}api/v1/people/${id}`)
    const data: Person = res.json() as unknown as Person;
    
    return data;
};

export const postPerson = async (data: PersonFormData) => {
    const res = await fetch(
        `${import.meta.env.VITE_DEV_API_URL}api/v1/people`,
        {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        },
    );

    const newPerson: Person = res.json() as unknown as Person;
    
    return newPerson;
}

export const putPerson = async (data: PersonFormData) => {
    const res = await fetch(
        `${import.meta.env.VITE_DEV_API_URL}api/v1/people`,
        {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        },
    );
}
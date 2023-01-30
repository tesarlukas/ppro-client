import Cookies from 'js-cookie';
import {
    FilmWork,
    Genre,
    GenreFormData,
    LoginCredentials,
    Page,
    Person,
    PersonFormData,
    RegisterCredentials,
    User,
    UserFormData,
} from './types';
import { toast } from 'react-toastify';

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
    const res = await fetch(
        `${import.meta.env.VITE_DEV_API_URL}api/v1/people/${id}`,
    );
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
                Authorization: `Bearer ${Cookies.get('auth')}`,
            },
            body: JSON.stringify(data),
        },
    );

    const newPerson: Person = (await res.json()) as unknown as Person;

    return newPerson;
};

export const putPerson = async (data: PersonFormData) => {
    const res = await fetch(
        `${import.meta.env.VITE_DEV_API_URL}api/v1/people`,
        {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Cookies.get('auth')}`,
            },
            body: JSON.stringify(data),
        },
    );
};

export const getGenre = async (id: number): Promise<Genre> => {
    const res = await fetch(
        `${import.meta.env.VITE_DEV_API_URL}api/v1/genres/${id}`,
    );
    const data: Genre = (await res.json()) as unknown as Genre;

    return data;
};

export const getGenres = async (): Promise<Page<Genre>> => {
    const res = await fetch(`${import.meta.env.VITE_DEV_API_URL}api/v1/genres`);
    const data: Page<Genre> = (await res.json()) as unknown as Page<Genre>;

    return data;
};

export const postGenre = async (data: GenreFormData) => {
    const res = await fetch(
        `${import.meta.env.VITE_DEV_API_URL}api/v1/genres`,
        {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Cookies.get('auth')}`,
            },
            body: JSON.stringify(data),
        },
    );

    const newGenre: Genre = (await res.json()) as unknown as Genre;

    return newGenre;
};

export const putGenre = async (data: GenreFormData) => {
    const res = await fetch(
        `${import.meta.env.VITE_DEV_API_URL}api/v1/genres`,
        {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Cookies.get('auth')}`,
            },
            body: JSON.stringify(data),
        },
    );
};

export const getUser = async (id: number): Promise<User> => {
    const res = await fetch(
        `${import.meta.env.VITE_DEV_API_URL}api/v1/users/${id}`,
    );
    const data: User = (await res.json()) as unknown as User;

    return data;
};

export const getUsersPlansToWatch = async (
    userId: number,
): Promise<Page<FilmWork>> => {
    const res = await fetch(
        `${
            import.meta.env.VITE_DEV_API_URL
        }api/v1/users/plans-to-watch/${userId}`,
    );
    const data: Page<FilmWork> =
        (await res.json()) as unknown as Page<FilmWork>;

    return data;
};

export const getUsersIsWatching = async (
    userId: number,
): Promise<Page<FilmWork>> => {
    const res = await fetch(
        `${import.meta.env.VITE_DEV_API_URL}api/v1/users/is-watching/${userId}`,
    );
    const data: Page<FilmWork> =
        (await res.json()) as unknown as Page<FilmWork>;

    return data;
};

export const getUsersHasWatched = async (
    userId: number,
): Promise<Page<FilmWork>> => {
    const res = await fetch(
        `${import.meta.env.VITE_DEV_API_URL}api/v1/users/has-watched/${userId}`,
    );
    const data: Page<FilmWork> =
        (await res.json()) as unknown as Page<FilmWork>;

    return data;
};

export const putUser = async (data: UserFormData) => {
    const res = await fetch(`${import.meta.env.VITE_DEV_API_URL}api/v1/users`, {
        method: 'PUT',
        headers: {
            Accept: '*/*',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookies.get('auth')}`,
        },
        body: JSON.stringify(data),
    });

    return res;
};

export const addToPlan = async (id: number | undefined) => {
    const res = await fetch(
        `${
            import.meta.env.VITE_DEV_API_URL
        }api/v1/account/plans-to-watch/${id}`,
        {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Cookies.get('auth')}`,
            },
        },
    );
    res.status === 417
        ? toast.warn('Already added')
        : toast.success('Successfully added');

    return res;
};

export const markAsFinished = async (id: number | undefined) => {
    const res = await fetch(
        `${import.meta.env.VITE_DEV_API_URL}api/v1/account/has-watched/${id}`,
        {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Cookies.get('auth')}`,
            },
        },
    );
    res.status === 417
        ? toast.warn('Already added')
        : toast.success('Successfully added');

    return res;
};

export const markAsWatching = async (id: number | undefined) => {
    const res = await fetch(
        `${import.meta.env.VITE_DEV_API_URL}api/v1/account/is-watching/${id}`,
        {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Cookies.get('auth')}`,
            },
        },
    );
    res.status === 417
        ? toast.warn('Already added')
        : toast.success('Successfully added');

    return res;
};

export const removeFromWatching = async (id: number | undefined) => {
    const res = await fetch(
        `${
            import.meta.env.VITE_DEV_API_URL
        }api/v1/account/plans-to-watch/${id}`,
        {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Cookies.get('auth')}`,
            },
        },
    );
    toast.success('Successfully removed');

    return res;
};

export const removeFromPlan = async (id: number | undefined) => {
    const res = await fetch(
        `${import.meta.env.VITE_DEV_API_URL}api/v1/account//${id}`,
        {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Cookies.get('auth')}`,
            },
        },
    );
    toast.success('Successfully removed');

    return res;
};

export const removeFromFinished = async (id: number | undefined) => {
    const res = await fetch(
        `${import.meta.env.VITE_DEV_API_URL}api/v1/account/has-watched/${id}`,
        {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Cookies.get('auth')}`,
            },
        },
    );
    toast.success('Successfully removed');

    return res;
};

export const sendUserProfileImg = async (userId: number, file: File) => {
    const formData: FormData = new FormData();
    formData.append('file', file);

    await fetch(
        `${import.meta.env.VITE_DEV_API_URL}api/v1/files/imgs/usr/upload/${userId}`,
        {
            method: 'POST',
            body: formData,
            headers: {
                Authorization: `Bearer ${Cookies.get('auth')}`,
            },
        },
    );
}
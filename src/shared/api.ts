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
} from './types';

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
            },
            body: JSON.stringify(data),
        },
    );

    const newPerson: Person = res.json() as unknown as Person;

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
            },
            body: JSON.stringify(data),
        },
    );
};

export const getGenre = async (id: number): Promise<Genre> => {
    const res = await fetch(
        `${import.meta.env.VITE_DEV_API_URL}api/v1/genres/${id}`,
    );
    const data: Genre = res.json() as unknown as Genre;

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
            },
            body: JSON.stringify(data),
        },
    );

    const newGenre: Genre = res.json() as unknown as Genre;

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
            },
            body: JSON.stringify(data),
        },
    );
};

export const getUser = async (id: number): Promise<User> => {
    const res = await fetch(
        `${import.meta.env.VITE_DEV_API_URL}api/v1/users/${id}`,
    );
    const data: User = res.json() as unknown as User;

    return data;
};

export const getUsersPlansToWatch = async (userId: number): Promise<Page<FilmWork>> => {
    const res = await fetch(
        `${import.meta.env.VITE_DEV_API_URL}api/v1/users/plans-to-watch/${userId}`,
    );
    const data: Page<FilmWork> = res.json() as unknown as Page<FilmWork>;

    return data;
};

export const getUsersIsWatching = async (userId: number): Promise<Page<FilmWork>> => {
    const res = await fetch(
        `${import.meta.env.VITE_DEV_API_URL}api/v1/users/is-watching/${userId}`,
    );
    const data: Page<FilmWork> = res.json() as unknown as Page<FilmWork>;

    return data;
};

export const getUsersHasWatched = async (userId: number): Promise<Page<FilmWork>> => {
    const res = await fetch(
        `${import.meta.env.VITE_DEV_API_URL}api/v1/users/has-watched/${userId}`,
    );
    const data: Page<FilmWork> = res.json() as unknown as Page<FilmWork>;

    return data;
};
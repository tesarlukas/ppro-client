export interface FilmWork {
    id: number;
    name: string;
    criticsScore: number;
    audienceScore: number;
    genres: Array<GenreSimple>;
    occupations: Array<Occupation>;
    reviews: Array<Review>;
}

export interface Genre {
    id: number;
    name: string;
    filmworks: Array<FilmWork>;
}

export interface GenreSimple {
    id: number;
    name: string;
}

export interface Person {
    id: number;
    firstName: string;
    lastName: string;
    casting: Array<OccupationSimple>;
}

export interface PersonSimple {
    id: number;
    firstName: string;
    lastName: string;
}

export interface Occupation {
    id: number;
    person: PersonSimple;
    filmwork: FilmWork;
    role: string;
}

export interface OccupationSimple {
    id: number;
    person_id: number;
    filmwork_id: number;
    role: string;
}

export interface UserSimple {
    id: number;
    username: string;
    email: string;
}

export interface User extends UserSimple {
    reviews: Array<Review>;
}

export interface Review {
    id: number;
    user: User;
    date: Date;
    comment: string;
    score: number;
    filmwork?: FilmWork;
}

export interface LoginFormInterface {
    username: { value: string };
    password: { value: string };
}

export interface RegisterFormInterface extends LoginFormInterface {
    email: { value: string };
    passwordRepeat: { value: string };
}

export interface LoginCredentials {
    username: string;
    password: string;
}

export interface ReviewFormInterface {
    score: { value: number };
    comment: { value: string };
}

export interface ReviewFormData {
    id?: number;
    score: number;
    comment: string;
    user: { id: number };
    filmwork: { id: string | undefined };
}

export interface RegisterCredentials extends LoginCredentials {
    email: string;
}

export interface Page<T> {
    content: Array<T>;
    empty: boolean;
    first: boolean;
    last: boolean;
    number: number;
    numberOfElements: number;
    pageable: Pageable;
    size: number;
    sort: Sort;
    totalElements: number;
    totalPages: number;
}

export interface Pageable {
    offset: number;
    pageNUmber: 0;
    pageSize: 20;
    paged: boolean;
    sort: Sort;
    unpaged: boolean;
}

export interface Sort {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
}


export interface FilmWorkSimple {
    id: number,
    name: string,
    criticsScore: number,
    audienceScore: number,
}

export interface FilmWork extends FilmWorkSimple {
    genres: Array<GenreSimple>,
    occupations: Array<OccupationSimple>,
    reviews: Array<ReviewSimple>
}

export interface Genre{
    id: number,
    name: string
    filmworks: Array<FilmWorkSimple>
}

export interface GenreSimple {
    id: number,
    name: string
}

export interface Person {
    id: number
    firstName: string,
    lastName: string,
    casting: Array<OccupationSimple>
}

export interface PersonSimple {
    id: number
    firstName: string,
    lastName: string,
}

export interface Occupation {
    id: number,
    person: PersonSimple,
    filmwork: FilmWorkSimple,
    role: string
}

export interface OccupationSimple {
    id: number,
    person_id: number,
    filmwork_id: number,
    role: string
}

export interface UserSimple {
    id: number,
    username: string,
    email: string,
}

export interface User extends UserSimple {
    reviews: Array<ReviewSimple>
}

export interface Review {
    user: User,
    date: Date,
    comment: string,
    score: number,
    filmwork: FilmWorkSimple
}

export interface ReviewSimple {
    user_id: number,
    date: Date,
    comment: string,
    score: number,
    filmwork_id: number, 
}


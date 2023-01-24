import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
    FilmWork as FilmWorkType,
    GenreSimple,
    Occupation,
} from '../shared/types';

const FilmWork: React.FC = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState<FilmWorkType>();

    const getFilmWork = async () => {
        const res = await fetch(
            `${import.meta.env.VITE_DEV_API_URL}api/v1/movies/${id}`,
        );
        const data: FilmWorkType = await res.json();
        if (data === undefined)
            throw new Error('failed to cast data from the response!');

        setMovie(data);
    };

    useEffect(() => {
        getFilmWork();
    }, []);

    return (
        <>
            <div>{movie?.name}</div>
            <div>{movie?.audienceScore}</div>
            <div>{movie?.criticsScore}</div>
            <div>
                {movie?.genres.map((genre: GenreSimple) => (
                    <span key={genre.id}>{genre.name}</span>
                ))}
            </div>
            <div>
                {movie?.occupations.map((occupation: Occupation) => (
                    <span key={occupation.id}>
                        {occupation.person.firstName}{' '}
                        {occupation.person.lastName},{' '}
                    </span>
                ))}
            </div>
            <div>reviews</div>
        </>
    );
};

export default FilmWork;

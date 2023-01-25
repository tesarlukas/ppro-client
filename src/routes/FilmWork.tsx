import React, { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import {
    FilmWork as FilmWorkType,
    GenreSimple,
    Occupation,
    ReviewFormData,
} from '../shared/types';
import Reviews from '../components/Reviews';
import ReviewForm from '../components/ReviewForm';

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

    const createReview = async (data: ReviewFormData): Promise<Response> => {
        const res = await fetch(
            `${import.meta.env.VITE_DEV_API_URL}api/v1/reviews`,
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            },
        );
        getFilmWork();
        return res;
    };

    const deleteReview = async (id: number): Promise<Response> => {
        const res = await fetch(
            `${import.meta.env.VITE_DEV_API_URL}api/v1/reviews/${id}`,
            { method: 'DELETE' },
        );
        getFilmWork();
        return res;
    };

    const handleDeleteReview = (id: number) => {
        deleteReview(id);
    };

    useEffect(() => {
        getFilmWork();
    }, []);

    return (
        <>
            <div className="flex flex-row justify-center mt-24">
                <div className="bg-slate-800 p-12 flex flex-col ">
                    <div className="flex flex-row justify-between">
                        <h1 className="text-5xl">{movie?.name}</h1>

                        <div className="text-5xl flex">
                            {movie?.audienceScore}/10{' '}
                            <FaStar className="bg text-yellow-500 ml-2" />
                        </div>
                    </div>
                    <div>
                        Genres:{' '}
                        {movie?.genres.map((genre: GenreSimple) => (
                            <span key={genre.id}>{genre.name}</span>
                        ))}
                    </div>
                    <div>
                        Cast:{' '}
                        {movie?.occupations.map((occupation: Occupation) => (
                            <Link
                                key={occupation.id}
                                to={`/person/${occupation.person.id}`}
                            >
                                <span>
                                    {`${occupation.person.firstName} ${occupation.person.lastName}, `}
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex flex-row">
                <Reviews
                    reviews={movie?.reviews}
                    handleDelete={handleDeleteReview}
                />
            </div>

            <div className="flex flex-row">
                <ReviewForm createReview={createReview} />
            </div>
        </>
    );
};

export default FilmWork;

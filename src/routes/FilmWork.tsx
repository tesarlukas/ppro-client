import React, { useContext, useEffect, useState } from 'react';
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
import Cookies from 'js-cookie';
import { addToPlan, markAsFinished, markAsWatching } from '../shared/api';
import { UserContext } from '../context';

const FilmWork: React.FC = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState<FilmWorkType>();
    const [review, setReview] = useState<ReviewFormData>();
    const [isEditing, setIsEditing] = useState<boolean>();
    const { user } = useContext(UserContext);

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
                    Authorization: `Bearer ${Cookies.get('auth')}`,
                },
                body: JSON.stringify(data),
            },
        );
        updateReviewsAndScore();
        return res;
    };

    const deleteReview = async (id: number): Promise<Response> => {
        const res = await fetch(
            `${import.meta.env.VITE_DEV_API_URL}api/v1/reviews/${id}`,
            {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${Cookies.get('auth')}`,
                },
            },
        );

        getFilmWork();
        return res;
    };

    const editReview = async (): Promise<Response> => {
        const res = await fetch(
            `${import.meta.env.VITE_DEV_API_URL}api/v1/reviews`,
            {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    Authorization: `Bearer ${Cookies.get('auth')}`,
                },
                body: JSON.stringify(review),
            },
        );
        updateReviewsAndScore();
        setIsEditing(false);

        return res;
    };

    const triggerEdit = async (id: number): Promise<Response> => {
        const res = await fetch(
            `${import.meta.env.VITE_DEV_API_URL}api/v1/reviews/${id}`,
        );
        const review: ReviewFormData = await res.json();

        setReview(review);
        setIsEditing(true);
        return res;
    };

    const updateReviewsAndScore = async () => {
        const res = await fetch(
            `${import.meta.env.VITE_DEV_API_URL}api/v1/movies/${id}`,
        );
        const data: FilmWorkType = await res.json();
        if (data === undefined)
            throw new Error('failed to cast data from the response!');

        setMovie({
            ...movie,
            audienceScore: data.audienceScore,
            reviews: data.reviews,
        } as FilmWorkType);
    };

    useEffect(() => {
        getFilmWork();
    }, []);

    return (
        <>
            <div className="layout">
                <div className="flex flex-row gap-6 mt-24 ">
                    <div className="bg-slate-800 p-12 flex flex-col rounded-2xl w-9/12 relative">
                        <div className="flex flex-row justify-between">
                            <h1 className="text-5xl">{movie?.name}</h1>

                            <div className="text-5xl flex">
                                {movie?.audienceScore}/10{' '}
                                <FaStar className="bg text-yellow-300 ml-2" />
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
                            {movie?.occupations.map(
                                (occupation: Occupation) => (
                                    <Link
                                        key={occupation.id}
                                        to={`/person/${occupation.person.id}`}
                                    >
                                        <span>
                                            {`${occupation.person.firstName} ${occupation.person.lastName}, `}
                                        </span>
                                    </Link>
                                ),
                            )}
                        </div>
                        <div className="flex flex-row flex-wrap absolute bottom-12 gap-2">
                            {user.name !== '' ? (
                                <>
                                    <button
                                        className="bg-pink-500 hover:text-pink-500 hover:bg-white border-none transition ease-in"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            addToPlan(movie?.id);
                                        }}
                                    >
                                        Add to plan
                                    </button>
                                    <button
                                        className="bg-lime-600 hover:text-lime-600 hover:bg-white border-none transition ease-in"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            markAsWatching(movie?.id);
                                        }}
                                    >
                                        Mark as watching
                                    </button>
                                    <button
                                        className="bg-blue-600 hover:text-blue-600 hover:bg-white border-none transition ease-in"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            markAsFinished(movie?.id);
                                        }}
                                    >
                                        Mark as finished
                                    </button>
                                </>
                            ) : (
                                ''
                            )}
                        </div>
                    </div>
                    <div className="w-3/12">
                        <ReviewForm
                            review={review}
                            setReview={setReview}
                            createReview={createReview}
                            isEditing={isEditing}
                            editReview={editReview}
                        />
                    </div>
                </div>
                <div className="flex flex-row flex-wrap justify-center">
                    <Reviews
                        reviews={movie?.reviews}
                        deleteReview={deleteReview}
                        triggerEdit={triggerEdit}
                    />
                </div>
            </div>
        </>
    );
};

export default FilmWork;

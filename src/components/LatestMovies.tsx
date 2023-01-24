import React, { useEffect, useState } from 'react';
import { FilmWork, Page } from '../shared/types';
import FilmWorkCard from './FilmWorkCard';

export const LatestMovies: React.FC = () => {
    const [latestMovies, setLatestMovies] = useState<Page<FilmWork>>();

    const getLatestMovies = (): void => {
        fetch(`${import.meta.env.VITE_DEV_API_URL}api/v1/movies`).then(
            async (res) => {
                const data: Page<FilmWork> = await res.json();
                if (data === undefined)
                    throw new Error('failed to cast data from the response!');

                console.log(data);
                setLatestMovies(data);
            },
        );
    };

    useEffect(() => {
        getLatestMovies();
    }, []);

    return (
        <div className="flex flex-row justify-between">
            {latestMovies?.content.map((value: FilmWork) => {
                return <FilmWorkCard key={value.id} filmwork={value} />;
            })}
        </div>
    );
};

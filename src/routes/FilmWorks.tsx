import React, { useEffect, useState } from 'react';
import { FilmWork, Page } from '../shared/types';
import FilmWorkCard from '../components/FilmWorkCard';
import { Link } from 'react-router-dom';

export const FilmWorks: React.FC = () => {
    const [filmworks, setFilmWorks] = useState<Page<FilmWork>>();

    const getFilmWorks = (): void => {
        fetch(`${import.meta.env.VITE_DEV_API_URL}api/v1/movies`).then(
            async (res) => {
                const data: Page<FilmWork> = await res.json();
                if (data === undefined)
                    throw new Error('failed to cast data from the response!');

                setFilmWorks(data);
            },
        );
    };

    useEffect(() => {
        getFilmWorks();
    }, []);

    return (
        <div className="flex flex-row justify-between">
            {filmworks?.content.map((value: FilmWork) => {
                return (
                    <Link key={value.id} to={`/filmwork/${value.id}`}>
                        <FilmWorkCard filmwork={value} />
                    </Link>
                );
            })}
        </div>
    );
};

export default FilmWorks;

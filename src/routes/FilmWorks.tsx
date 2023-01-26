import React, { useEffect, useState } from 'react';
import { FilmWork, Page } from '../shared/types';
import FilmWorkCard from '../components/FilmWorkCard';
import { Link } from 'react-router-dom';
import FilterControls from '../components/FilterControls';

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

    const deleteFilmWork = async (id: number): Promise<Response> => {
        const res = await fetch(
            `${import.meta.env.VITE_DEV_API_URL}api/v1/movies/${id}`,
            {
                method: 'DELETE',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            },
        );
        getFilmWorks();

        return res;
    };

    useEffect(() => {
        getFilmWorks();
    }, []);

    return (
        <>
            <FilterControls />
            <div className="flex flex-row flex-wrap gap-x-48 gap-y-48 pt-24 justify-center">
                {filmworks?.content.map((value: FilmWork) => {
                    return (
                        <Link key={value.id} to={`/filmwork/${value.id}`}>
                            <FilmWorkCard
                                deleteFilmWork={deleteFilmWork}
                                filmwork={value}
                            />
                        </Link>
                    );
                })}
            </div>
        </>
    );
};

export default FilmWorks;

import React, { useContext, useEffect, useState } from 'react';
import { FilmWork, Page } from '../shared/types';
import FilmWorkCard from '../components/FilmWorkCard';
import { Link } from 'react-router-dom';
import FilterControls from '../components/FilterControls';
import { FaPlus } from 'react-icons/fa';
import { UserContext } from '../context';
import Cookies from 'js-cookie';
import { getMoviesByGenre, searchMoviesByName } from '../shared/api';

export const FilmWorks: React.FC = () => {
    const [filmworks, setFilmWorks] = useState<Page<FilmWork>>();
    const { user } = useContext(UserContext);

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
                    Authorization: `Bearer ${Cookies.get('auth')}`,
                },
            },
        );
        getFilmWorks();

        return res;
    };

    const handleGenreClick = async (id: number): void => {
        const data: Page<FilmWork> = await getMoviesByGenre(id);

        if (data === undefined)
            throw new Error("Couldn't fetch movies by genres!");

        setFilmWorks(data);
    };

    const handleSearch = async (query: string) => {
        const data: Page<FilmWork> = await searchMoviesByName(query);

        if (query.length === 0) {
            console.log('cringe');
            getFilmWorks();
            return;
        }

        if (data === undefined)
            throw new Error("Couldn't fetch movies by name!");

        setFilmWorks(data);
    };

    useEffect(() => {
        getFilmWorks();
    }, []);

    return (
        <div className="layout relative">
            <FilterControls
                onGenreClick={handleGenreClick}
                onSearchChange={handleSearch}
            />
            <div className="flex flex-row flex-wrap gap-x-48 gap-y-48 mt-24 justify-center">
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
            {user.role === 'ADMIN' ? (
                <div className="fixed flex flex-col flex-wrap gap-2 bottom-5 right-20">
                    <Link to="/create">
                        <div className="admin-control hover:text-blue-600 bg-blue-600 hover:bg-white">
                            <h3 className="text-2xl">Add a movie</h3>
                        </div>
                    </Link>

                    <Link to="/person/create">
                        <div className="admin-control hover:text-blue-700 bg-blue-700 hover:bg-white">
                            <h3 className="text-2xl">Add a person</h3>
                        </div>
                    </Link>
                    <Link to="/genre/create">
                        <div className="admin-control hover:text-blue-800 bg-blue-800 hover:bg-white">
                            <h3 className="text-2xl">Add a genre</h3>
                        </div>
                    </Link>
                </div>
            ) : (
                ''
            )}
        </div>
    );
};

export default FilmWorks;

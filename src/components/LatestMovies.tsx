import React, {useEffect, useState} from 'react';
import {FilmWork} from '../shared/types';
import FilmWorkCard from './FilmWorkCard';

export const LatestMovies: React.FC = () => {

    const [latestMovies, setLatestMovies] = useState<Array<FilmWork>>(Array.of());

    const getLatestMovies = () : void => {

        fetch(`${import.meta.env.VITE_DEV_API_URL}api/v1/movies/getLatestMovies`)
            .then(async res => {

                const data: Array<FilmWork> = await res.json();

                if (data === undefined) throw new Error('failed to cast data from the response!');
                
                setLatestMovies(data);

            });

    };

    useEffect(() => {
        getLatestMovies();
    },[]);


    return <div className='flex flex-row justify-between'>
        {
            latestMovies.map((value: FilmWork) => {
                return <FilmWorkCard key={value.id} filmwork={value}/>;
            })
        }
    </div>;

};
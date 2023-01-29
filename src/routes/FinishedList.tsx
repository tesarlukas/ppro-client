import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FilmWork } from '../shared/types';
import { Page } from '../shared/types';
import EntryList from '../components/EntryList';
import { removeFromFinished } from '../shared/api';

const FinishedList = () => {
    const { id } = useParams<string>();
    const [filmworks, setFilmWorks] = useState<Array<FilmWork>>([]);

    const getUserFinishedList = async (id: number) => {
        const res = await fetch(
            `${import.meta.env.VITE_DEV_API_URL}api/v1/users/has-watched/${id}`,
        );
        const data: Page<FilmWork> = await res.json();
        if (data === undefined)
            throw new Error('failed to cast data from the response!');

        setFilmWorks(data.content);
    };

    useEffect(() => {
        getUserFinishedList(Number(id));
    }, []);

    return (
        <div className="layout w-5/6 mt">
            <EntryList
                entries={filmworks}
                removeFromFinished={removeFromFinished}
            />
        </div>
    );
};

export default FinishedList;

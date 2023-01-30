import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FilmWork } from '../shared/types';
import EntryList from '../components/EntryList';
import {
    addToPlan,
    getUsersIsWatching,
    markAsFinished,
    removeFromWatching,
} from '../shared/api';

const WatchingList = () => {
    const { id } = useParams<string>();
    const [filmworks, setFilmWorks] = useState<Array<FilmWork>>([]);

    const getData = async () => {
        const data = await getUsersIsWatching(Number(id));
        setFilmWorks(data.content);
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className="layout w-5/6 mt">
            <EntryList
                entries={filmworks}
                setEntries={setFilmWorks}
                markAsFinished={markAsFinished}
                removeFromWatching={removeFromWatching}
            />
        </div>
    );
};

export default WatchingList;

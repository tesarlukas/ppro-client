import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FilmWork } from '../shared/types';
import EntryList from '../components/EntryList';
import { getUsersHasWatched, removeFromFinished } from '../shared/api';

const FinishedList = () => {
    const { id } = useParams<string>();
    const [filmworks, setFilmWorks] = useState<Array<FilmWork>>([]);

    const getData = async () => {
        const data = await getUsersHasWatched(Number(id));
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
                removeFromFinished={removeFromFinished}
            />
        </div>
    );
};

export default FinishedList;

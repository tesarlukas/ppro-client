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
        <div className="layout w-5/6">
            <h3 className="text-5xl text-slate-900 text-center p-12">
                Finished movies
            </h3>
            <EntryList
                entries={filmworks}
                setEntries={setFilmWorks}
                removeFromFinished={removeFromFinished}
            />
        </div>
    );
};

export default FinishedList;

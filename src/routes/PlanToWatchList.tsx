import React, { useEffect, useState } from 'react';
import EntryList from '../components/EntryList';
import { useParams } from 'react-router-dom';
import { FilmWork } from '../shared/types';
import {
    getUsersPlansToWatch,
    markAsFinished,
    markAsWatching,
    removeFromPlan,
} from '../shared/api';

const PlanToWatchList: React.FC = () => {
    const { id } = useParams<string>();
    const [filmworks, setFilmWorks] = useState<Array<FilmWork>>([]);

    const getData = async () => {
        const data = await getUsersPlansToWatch(Number(id));
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
                markAsWatching={markAsWatching}
                removeFromWatching={removeFromPlan}
            />
        </div>
    );
};

export default PlanToWatchList;

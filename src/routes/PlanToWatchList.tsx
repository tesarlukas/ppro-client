import React, { useEffect, useState } from 'react';
import EntryList from '../components/EntryList';
import { useParams } from 'react-router-dom';
import { FilmWork, Page } from '../shared/types';
import { markAsFinished, markAsWatching, removeFromPlan } from '../shared/api';

const PlanToWatchList: React.FC = () => {
    const { id } = useParams<string>();
    const [filmworks, setFilmWorks] = useState<Array<FilmWork>>([]);

    const getUserPlanToWatch = async (id: number) => {
        const res = await fetch(
            `${
                import.meta.env.VITE_DEV_API_URL
            }api/v1/users/plans-to-watch/${id}`,
        );
        const data: Page<FilmWork> = await res.json();
        if (data === undefined)
            throw new Error('failed to cast data from the response!');

        setFilmWorks(data.content);
    };

    useEffect(() => {
        getUserPlanToWatch(Number(id));
    }, []);

    return (
        <div className="layout w-5/6 mt">
            <EntryList
                entries={filmworks}
                markAsFinished={markAsFinished}
                markAsWatching={markAsWatching}
                removeFromWatching={removeFromPlan}
            />
        </div>
    );
};

export default PlanToWatchList;

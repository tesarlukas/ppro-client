import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Occupation, Page, Person as PersonType } from '../shared/types';
import { Link } from 'react-router-dom';

const Person = () => {
    const { id } = useParams<string>();
    const [person, setPerson] = useState<PersonType>();
    const [occupations, setOccupations] = useState<Page<Occupation>>();

    const getPerson = async () => {
        const res = await fetch(
            `${import.meta.env.VITE_DEV_API_URL}api/v1/people/${id}`,
        );
        const data: PersonType = await res.json();
        if (data === undefined)
            throw new Error('failed to cast data from the response!');

        setPerson(data);
    };

    useEffect(() => {
        getPerson();
        getMoviesByPerson();
    }, []);

    const getMoviesByPerson = async () => {
        const res = await fetch(
            `${
                import.meta.env.VITE_DEV_API_URL
            }api/v1/occupations/by-person/${id}`,
        );
        const data: Page<Occupation> = await res.json();
        if (data === undefined)
            throw new Error('failed to cast data from the response!');

        console.log(data);

        setOccupations(data);
    };

    return (
        <>
            <div className="bg-slate-800">
                <div>
                    {person?.firstName} {person?.lastName}
                </div>
                <div>
                    {occupations?.content.map((occupation: Occupation) => {
                        return (
                            <span key={occupation.id}>
                                <Link
                                    to={`/filmwork/${occupation.filmwork.id}`}
                                >
                                    {occupation.filmwork.name + ' '}
                                </Link>
                                as
                                {' ' + occupation.role}
                            </span>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default Person;

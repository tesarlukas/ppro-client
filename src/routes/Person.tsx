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
            <div className="layout">
                <div className="flex bg-slate-800 rounded-2xl mt-24 text-5xl p-8">
                    {person?.firstName} {person?.lastName}
                </div>
                <div className='bg-slate-800 rounded-2xl mt-3 p-8'>
                    <h4 className='text-3xl text-center pb-8'>Occupations</h4>
                    <div className='flex flex-col justify-around'>
                        <div className='flex flex-row bg-slate-700 rounded-t-md flex-wrap'>
                            <h6 className='w-1/2 text-center'>Filmwork</h6>
                            <h6 className='w-1/2 text-center'>Role</h6>
                        </div>
                    {occupations?.content.map((occupation: Occupation, index: number) => {
                        return (
                            <div className='flex {index % 2 === 1 ? bg-slate-600 : bg-slate-700} flex-row justify-center' key={occupation.id}>
                                <Link className='w-1/2 text-center' to={`/filmwork/${occupation.filmwork.id}`}>
                                    {occupation.filmwork.name + ' '}
                                </Link>
                                <span className='w-1/2 text-center'>
                                    {occupation.role}
                                </span>
                            </div>
                        );
                    })}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Person;

import React from 'react';
import TextField from '../components/TextField';
import { FilmWorkFormData, FilmWorkFormInterface } from '../shared/types';

const Create = () => {
    const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const { title, release } = e.target as typeof e.target &
            FilmWorkFormInterface;

        const data = {
            name: title.value,
            releaseDate: release.value as unknown as Date,
        } as FilmWorkFormData;

        createMovie(data);
    };

    const createMovie = async (data: FilmWorkFormData) => {
        const res = await fetch(
            `${import.meta.env.VITE_DEV_API_URL}api/v1/movies`,
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            },
        );
        return res;
    };

    return (
        <div className="layout">
            <form
                onSubmit={handleCreate}
                className="flex flex-col bg-slate-800 p-4 rounded-xl mt-48"
            >
                <h6>Name</h6>
                <TextField type="text" name="title" />
                <h6>Release date</h6>
                <input
                    className="bg-slate-600 "
                    type="date"
                    name="release"
                    id=""
                />
                <input
                    className="mt-4 border border-slate-300"
                    type="submit"
                    value="Create a Movie"
                ></input>
            </form>
        </div>
    );
};

export default Create;

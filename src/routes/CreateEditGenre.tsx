import React, { useEffect, useState } from 'react';
import TextField from '../components/TextField';
import { useNavigate, useParams } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';
import { getGenre, postGenre, putGenre } from '../shared/api';
import { Genre, GenreFormData, GenreFormInterface } from '../shared/types';

const CreateEditPerson: React.FC = () => {
    const { id } = useParams<string>();

    const navigate = useNavigate();
    const [name, setName] = useState<string>();

    const fetchGenre = async () => {
        if (id === undefined)
            return console.log('Genre not fetched. Creating...');

        const genre: Genre = await getGenre(parseInt(id));

        setName(genre.name);
    };

    const createGenre = async (data: GenreFormData) => {
        const newGenre: Genre = await postGenre(data);
        navigate(`/genre/${newGenre.id}`);
    };

    const editGenre = async (data: GenreFormData) => {
        console.log(data);
        const res = await putGenre(data);
        navigate(`/genre/${id}`);
    };

    const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const { name } = e.target as typeof e.target & GenreFormInterface;

        const data: GenreFormData = {
            name: name.value,
        };

        createGenre(data);
    };

    const handleEdit = (e: React.FormEvent<HTMLFormElement>) => {
        console.log('Editing');
        e.preventDefault();

        const { name } = e.target as typeof e.target & GenreFormInterface;

        if (id === undefined)
            return console.error('Failed to edit a person! ID is invalid!');

        const data: GenreFormData = {
            id: parseInt(id),
            name: name.value,
        };

        editGenre(data);
    };

    useEffect(() => {
        fetchGenre();
    }, []);

    return (
        <div className="layout">
            <form
                // eslint-disable-next-line no-constant-condition
                onSubmit={id === undefined ? handleCreate : handleEdit}
                className="flex flex-col bg-slate-800 p-4 rounded-xl mt-48"
            >
                <h1 className="text-3xl text-center pb-8">
                    {id === undefined ? 'Create a genre' : 'Edit a genre'}
                </h1>
                <h6>Name</h6>
                <TextField type="text" name="name" value={name} />
                <input
                    className="mt-4 border border-slate-300"
                    type="submit"
                    value={
                        id === undefined ? 'Create a genre' : 'Edit the genre'
                    }
                ></input>
            </form>
        </div>
    );
};

export default CreateEditPerson;


import React, { useEffect, useState } from 'react';
import TextField from '../components/TextField';
import { MovieFormData, MovieFormInterface, Movie, PersonFormData, Person, PersonFormInterface } from '../shared/types';
import { useNavigate, useParams } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';
import { getPerson, postPerson, putPerson } from '../shared/api';

const CreateEditPerson: React.FC = () => {
    const { id } = useParams<string>();

    const navigate = useNavigate();

    const [firstName, setFirstName] = useState<string>();
    const [lastName, setLastname] = useState<string>();
    
    const fetchPerson = async () => { 
        if (id === undefined)
            return console.log("Person not fetched. Creating...")
        
        const person: Person = await getPerson(parseInt(id));

        setFirstName(person.firstName);
        setLastname(person.lastName);
    }

    const createPerson = async (data: PersonFormData) => {
        const newPerson: Person = await postPerson(data);
        navigate(`/person/${newPerson.id}`);
    };

    const editPerson = async (data: PersonFormData) => {
        console.log(data);
        const res = await putPerson(data);
        navigate(`/person/${id}`);
    };

    const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const { firstName, lastName } = e.target as typeof e.target & PersonFormInterface;

        const data: PersonFormData = {
            firstName: firstName.value,
            lastName: lastName.value
        };

        createPerson(data);
    };

    const handleEdit = (e: React.FormEvent<HTMLFormElement>) => {
        console.log('Editing');
        e.preventDefault();

        const { firstName, lastName } = e.target as typeof e.target & PersonFormInterface;

        if (id === undefined)
                    return console.error("Failed to edit a person! ID is invalid!")

        const data: PersonFormData = {
            id: parseInt(id),
            firstName: firstName.value,
            lastName: lastName.value
        };

        editPerson(data);
    };

    useEffect(() => {
        fetchPerson();
    }, []);

    return (
        <div className="layout">
            <form
                // eslint-disable-next-line no-constant-condition
                onSubmit={id === undefined ? handleCreate : handleEdit}
                className="flex flex-col bg-slate-800 p-4 rounded-xl mt-48">
                <h1 className='text-3xl text-center pb-8'>{id === undefined ? "Create a person" : "Edit a person"}</h1>
                <h6>First name</h6>
                <TextField type="text" name="firstName" value={firstName} />
                <h6>Last name</h6>
                <TextField type="text" name="lastName" value={lastName} />
                <input
                    className="mt-4 border border-slate-300"
                    type="submit"
                    value={
                        id === undefined ? 'Create a person' : 'Edit the person'
                    }
                ></input>
            </form>
        </div>
    );
};

export default CreateEditPerson;

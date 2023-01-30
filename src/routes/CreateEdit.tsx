import React, { useContext, useEffect, useState } from 'react';
import TextField from '../components/TextField';
import { MovieFormData, MovieFormInterface, Movie } from '../shared/types';
import { useNavigate, useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import Cookies from 'js-cookie';
import { sendFilmworkImg, sendUserProfileImg } from '../shared/api';
import { toast } from 'react-toastify';

const CreateEdit = () => {
    const { id } = useParams<string>();
    const [name, setName] = useState<string>();
    const [release, setRelease] = useState<Date>(new Date());
    const [errorMessage, setErrorMessage] = useState<string>();

    const navigate = useNavigate();

    const fetchMovie = async (): Promise<Response> => {
        const res = await fetch(
            `${import.meta.env.VITE_DEV_API_URL}api/v1/movies/${id}`,
        );
        const data: Movie = await res.json();
        const formatedDate = data.releaseDate.split('-');
        const newDate = new Date(
            Number(formatedDate[0]),
            Number(formatedDate[1]),
            Number(formatedDate[2]),
        );
        setName(data.name);
        setRelease(newDate);

        return res;
    };

    const createMovie = async (data: MovieFormData) => {
        const res = await fetch(
            `${import.meta.env.VITE_DEV_API_URL}api/v1/movies`,
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${Cookies.get('auth')}`,
                },
                body: JSON.stringify(data),
            },
        );
        toast.success('Movie created');
        return res;
    };

    const editMovie = async (data: MovieFormData) => {
        const res = await fetch(
            `${import.meta.env.VITE_DEV_API_URL}api/v1/movies`,
            {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${Cookies.get('auth')}`,
                },
                body: JSON.stringify(data),
            },
        );
        navigate('/filmworks');
        toast.success('Movie edited');
        return res;
    };

    const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const { title } = e.target as typeof e.target & MovieFormInterface;

        const data = {
            name: title.value,
            releaseDate: format(release, 'yyyy-MM-dd'),
        } as MovieFormData;
        createMovie(data);
    };

    const handleEdit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const { title } = e.target as typeof e.target & MovieFormInterface;

        const data = {
            id: id as unknown as number,
            name: title.value,
            releaseDate: format(release, 'yyyy-MM-dd'),
        } as MovieFormData;

        editMovie(data);
    };

    const handleFileSubmit = async (
        e: React.FormEvent<HTMLFormElement>,
    ): Promise<void> => {
        try {
            e.preventDefault();

            const file: File = (e.target as any)[0].files[0];

            if (file === undefined)
                throw new Error('File is not defined! Please add a file.');

            if (id === undefined)
                throw new Error(
                    "Failed to edit the profile img! user's ID is invalid!",
                );

            await sendFilmworkImg(parseInt(id), file);
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        if (id !== undefined) {
            fetchMovie();
        }
    }, []);

    return (
        <div className="layout">
            <form
                // eslint-disable-next-line no-constant-condition
                onSubmit={id === undefined ? handleCreate : handleEdit}
                className="flex flex-col bg-slate-800 p-4 rounded-xl mt-48"
            >
                <h6>Name</h6>
                <TextField type="text" name="title" value={name} />
                <h6>Release date</h6>
                <DatePicker
                    className="bg-slate-600 w-full border-slate-300"
                    selected={release}
                    onChange={(date: Date) => setRelease(date)}
                />
                <input
                    className="mt-4 border border-slate-300"
                    type="submit"
                    value={
                        id === undefined ? 'Create a movie' : 'Edit the movie'
                    }
                ></input>
            </form>
            <form
                encType="multipart/form-data"
                className="flex flex-col bg-slate-800 p-4 rounded-xl mt-2"
                onSubmit={(e) => handleFileSubmit(e)}
            >
                <input type="file" name="file" />
                <input
                    className="mt-4 border border-slate-300"
                    type="submit"
                    value="Add image"
                />
            </form>
        </div>
    );
};

export default CreateEdit;

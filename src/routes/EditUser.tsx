import React, { useEffect, useState } from 'react';
import TextField from '../components/TextField';
import { useNavigate, useParams } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';
import { getUser, putUser, sendUserProfileImg } from '../shared/api';
import { User, UserFormData, UserFormInterface } from '../shared/types';
import { da } from 'date-fns/locale';
import Cookies from 'js-cookie';

const EditUser: React.FC = () => {
    const { id } = useParams<string>();

    const navigate = useNavigate();
    const [username, setUsername] = useState<string>();
    const [errorMessage, setErrorMessage] = useState<string>();

    const fetchUser = async () => {
        if (id === undefined) throw new Error('User ID is not defined!');

        const data: User = await getUser(parseInt(id));

        if (data === undefined) throw new Error('Couldn\'t fetch the user!');

        setUsername(data.username);
    };

    const editGenre = async (data: UserFormData) => {
        console.log(data);
        const res = await putUser(data);

        if (res === undefined) throw new Error('Failed to edit the user!');

        navigate(`/user/${id}`);
    };

    const handleEdit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const { username, newRepeatPassword, newPassword } =
                e.target as typeof e.target & UserFormInterface;

            if (id === undefined)
                throw new Error('Failed to edit a user! ID is invalid!');

            if (newRepeatPassword.value !== newPassword.value)
                throw new Error('Failed to edit! New passwords do not match!');

            const data: UserFormData = {
                id: parseInt(id),
                password: newPassword.value,
                username: username.value,
            };

            putUser(data);

            navigate(`/user/${id}`);
        } catch (error: any) {
            setErrorMessage(error.message);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

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
                    'Failed to edit the profile img! user\'s ID is invalid!',
                );

            await sendUserProfileImg(parseInt(id), file);
        } catch (error: any) {
            setErrorMessage(error.message);
        }
    };

    return (
        <div className="layout">
            <form
                onSubmit={handleEdit}
                className="flex flex-col bg-slate-800 p-4 max-w-xs rounded-xl mt-48"
            >
                <div
                    className={`bg-red-800 p-3 mb-3 rounded-md ${
                        errorMessage ? '' : 'hidden'
                    } text-center`}
                >
                    {errorMessage}
                </div>
                <h1 className="text-3xl text-center pb-8">Edit a user</h1>
                <h6>Name</h6>
                <TextField type="text" name="username" value={username} />
                <h6>New password</h6>
                <TextField type="password" name="newPassword" />
                <h6>New password repeated</h6>
                <TextField type="password" name="newRepeatPassword" />
                <input
                    className="mt-4 border border-slate-300"
                    type="submit"
                    value={'Edit the user'}
                ></input>
            </form>
            <div>
                <form
                    encType="multipart/form-data"
                    className="flex flex-col bg-slate-800 p-4 max-w-xs rounded-xl mt-2"
                    onSubmit={(e) => handleFileSubmit(e)}
                >
                    <input type="file" name="file" />
                    <input
                        className="mt-4 border border-slate-300"
                        type="submit"
                        value="Edit the profile img"
                    />
                </form>
            </div>
        </div>
    );
};

export default EditUser;

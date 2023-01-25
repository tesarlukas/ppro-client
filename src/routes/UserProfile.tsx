import React, { useEffect, useState } from 'react';
import { User } from '../shared/types';
import { useParams } from 'react-router-dom';

const UserProfile: React.FC = () => {
    const { id } = useParams<string>();
    const [user, setUser] = useState<User>();

    const getUser = async () => {
        const res = await fetch(
            `${import.meta.env.VITE_DEV_API_URL}api/v1/users/${id}`,
        );
        const data: User = await res.json();
        if (data === undefined)
            throw new Error('failed to cast data from the response!');

        setUser(data);
    };

    useEffect(() => {
        getUser();
    }, []);

    return <div>{user?.username}</div>;
};

export default UserProfile;

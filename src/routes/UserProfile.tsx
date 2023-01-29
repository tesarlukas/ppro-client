import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
    DecodedToken,
    FilmWork,
    Page,
    Review,
    User as UserType,
} from '../shared/types';
import {
    getUser,
    getUsersHasWatched,
    getUsersIsWatching,
    getUsersPlansToWatch,
} from '../shared/api';
import WatchListInfo from '../components/WatchListInfo';
import UsersReview from '../components/UsersReview';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';

const UserProfile: React.FC = () => {
    const { id } = useParams<string>();

    const [user, setUser] = useState<UserType>();

    const [plansToWatchCount, setPlansToWatchCount] = useState<number>(0);
    const [hasWatchedCount, setHasWatchedCount] = useState<number>(0);
    const [isWatchingCount, setIsWatchingCount] = useState<number>(0);

    const fetchUser = async () => {
        if (id === undefined)
            throw new Error('Couldn\'t fetch user! ID is undefined!');

        const userId: number = parseInt(id);

        const data = await getUser(userId);

        if (data === undefined)
            throw new Error('failed to cast data from the response!');

        setUser(data);

        const hasWatchedData: Page<FilmWork> = await getUsersHasWatched(userId);
        const isWatchingData: Page<FilmWork> = await getUsersIsWatching(userId);
        const plansToWatchData: Page<FilmWork> = await getUsersPlansToWatch(
            userId,
        );

        if (hasWatchedData === undefined)
            throw new Error('failed to fetch \'has watched\' data!');

        setHasWatchedCount(hasWatchedData.totalElements);

        if (isWatchingData === undefined)
            throw new Error('failed to fetch \'is watching\' data!');

        setIsWatchingCount(isWatchingData.totalElements);

        if (plansToWatchData === undefined)
            throw new Error('failed to fetch \'plans to watch\' data!');

        setPlansToWatchCount(plansToWatchData.totalElements);
    };

    const checkEditability = (): JSX.Element | null => {
        if (id === undefined)
            throw new Error('Couldn\'t fetch user! ID is undefined!');

        let cookie: string | undefined;

        if ((cookie = Cookies.get('auth')) === undefined) return null;

        const credentials: DecodedToken = jwtDecode(cookie);

        if (credentials.id !== parseInt(id)) return null;

        return (
            <Link
                to={`/user/edit/${id}`}
                className="text-center rounder text-1xl rounded-lg text-lg m-auto w-min py-1 px-4 bg-emerald-900"
            >
                Edit
            </Link>
        );
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <div className="flex flex-col w-full self-center justify-center gap-7">
            <div className="flex flex-row gap-6 mt-24 justify-center">
                <div className="flex flex-col bg-slate-800 rounded-2xl w-1/4 p-8">
                    <h6 className="text-center text-5xl">{user?.username}</h6>
                    <img
                        className="w-32 mx-auto my-4 h-32"
                        src={
                            import.meta.env.VITE_DEV_API_URL +
                            'api/v1/' +
                            user?.profileImg
                        }
                    />
                    {checkEditability()}
                </div>
                <div className="flex flex-col gap-3 w-1/3 justify-center bg-slate-800 rounded-2xl p-8">
                    <WatchListInfo
                        color="bg-orange-500"
                        text="Plans to watch"
                        count={plansToWatchCount}
                        link={`/user/plans-to-watch/${id}`}
                    ></WatchListInfo>
                    <WatchListInfo
                        color="bg-cyan-500"
                        text="Currently watching"
                        count={isWatchingCount}
                        link={`/user/is-watching/${id}`}
                    ></WatchListInfo>
                    <WatchListInfo
                        color="bg-green-500"
                        text="Finished watching"
                        count={hasWatchedCount}
                        link={`/user/has-watched/${id}`}
                    ></WatchListInfo>
                </div>
            </div>
            <div className="flex flex-col mt-5 rounded-2xl p-8 self-center bg-slate-800 w-1/3">
                <h3 className="text-center text-4xl">Recent reviews</h3>
                <div className="flex flex-col gap-8">
                    {user?.reviews.map((item: Review) => {
                        return <UsersReview review={item}></UsersReview>;
                    })}
                </div>
            </div>
        </div>
    );
};

export default UserProfile;

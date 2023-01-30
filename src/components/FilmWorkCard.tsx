import React, { useContext } from 'react';
import { AuthUser, FilmWork, GenreSimple } from '../shared/types';
import { FaRegEdit, FaTimes } from 'react-icons/fa';
import { UserContext } from '../context';
import { useNavigate } from 'react-router-dom';

export const FilmWorkCard: React.FC<{
    filmwork: FilmWork;
    deleteFilmWork: (id: number) => Promise<Response>;
}> = ({ filmwork, deleteFilmWork }) => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    const getImgPath = (): string => {
        if (filmwork.img)
            return `${import.meta.env.VITE_DEV_API_URL}api/v1/${filmwork.img}`;

        return 'assets/images/movie.jpg';
    };

    return (
        <div className="relative bg-gray-900 flex flex-col h-96 w-64 rounded-xl shadow-xl hover:-translate-y-1 transition ease-out hover:scale-105">
            <img
                src={getImgPath()}
                className="h-64 object-cover rounded-t-xl"
            />
            <div className="flex flex-col py-3 ">
                <h2 className="font-bold px-4 py-1 text-xl">{filmwork.name}</h2>
                <h3 className="font-bold px-4 py-1">
                    {filmwork.genres.map((genre: GenreSimple) => {
                        return <span key={genre.id}>{genre.name} </span>;
                    })}
                </h3>
                <h3 className="px-4 py-2">{filmwork.audienceScore} / 10</h3>
                {user.role === 'ADMIN' ? (
                    <>
                        <button
                            className="control absolute -bottom-5 -right-5 bg-red-600 hover:text-red-600 hover:bg-white"
                            onClick={(e) => {
                                e.preventDefault();
                                deleteFilmWork(filmwork.id);
                            }}
                        >
                            <FaTimes size={30} />
                        </button>
                        <button
                            className="control absolute -bottom-5 right-12 bg-emerald-600 hover:text-emerald-600 hover:bg-white"
                            onClick={(e) => {
                                e.preventDefault();
                                navigate(`/edit/${filmwork.id}`);
                            }}
                        >
                            <FaRegEdit
                                className="absolute top-4 left-5"
                                size={30}
                            />
                        </button>
                    </>
                ) : (
                    ''
                )}
            </div>
        </div>
    );
};

export default FilmWorkCard;

import React, { useContext } from 'react';
import { AuthUser, FilmWork, GenreSimple } from '../shared/types';
import { FaTimes } from 'react-icons/fa';
import { UserContext } from '../context';

export const FilmWorkCard: React.FC<{
    filmwork: FilmWork;
    deleteFilmWork: (id: number) => Promise<Response>;
}> = ({ filmwork, deleteFilmWork }) => {
    const { user } = useContext(UserContext);

    return (
        <div className="bg-gray-900 flex flex-col h-96 w-64 rounded-xl shadow-xl hover:-translate-y-1 transition ease-out hover:scale-105">
            <img
                src="assets/images/movie.jpg"
                className="h-64 object-cover rounded-t-xl"
            />
            <div className="flex flex-col py-3 relative">
                <h2 className="font-bold px-4 py-1 text-xl">{filmwork.name}</h2>
                <h3 className="font-bold px-4 py-1">
                    {filmwork.genres.map((genre: GenreSimple) => {
                        return (
                            <span key={genre.id}>
                                {genre.name}
                                {genre.id !== filmwork.genres.length
                                    ? ', '
                                    : ''}
                            </span>
                        );
                    })}
                </h3>
                <h3 className="px-4 py-2">{filmwork.audienceScore} / 10</h3>
                {user.role === 'ADMIN' ? (
                    <button
                        className="control absolute -bottom-5 -right-5 bg-red-600 hover:text-red-600 hover:bg-white"
                        onClick={(e) => {
                            e.preventDefault();
                            deleteFilmWork(filmwork.id);
                        }}
                    >
                        <FaTimes size={30} />
                    </button>
                ) : (
                    ''
                )}
            </div>
        </div>
    );
};

export default FilmWorkCard;

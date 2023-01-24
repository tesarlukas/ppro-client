import React from 'react';
import {FilmWork} from '../model/Interface';

export const FilmWorkCard: React.FC<{filmwork: FilmWork}> = ({filmwork}) => {

    return <div className='bg-teal-400 flex flex-col justify-center items-center h-48 w-40'>
        <h2 className='font-bold p-4 text-xl'>{filmwork.name}</h2>
        <h3 className='p-4'>{filmwork.audienceScore} / 10</h3>
    </div>;
};

export default FilmWorkCard;
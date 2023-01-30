import React, { MouseEventHandler, useEffect, useState } from 'react';
import { getGenres } from '../shared/api';
import { Genre, Page } from '../shared/types';

interface FilterControlsProps {
    onGenreClick: (id: number) => void;
    onSearchChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
}

const FilterControls: React.FC<FilterControlsProps> = (
    props: FilterControlsProps,
) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [genres, setGenres] = useState<Array<Genre>>([]);

    const fetchGenres = async (): Promise<void> => {
        const data: Array<Genre> = (await getGenres()).content;
        setGenres(data);
    };

    const handleClick = (id: number) => {
        setIsOpen(!isOpen);
        props.onGenreClick(id);
    };

    const handleOpen = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        fetchGenres();
    }, []);

    return (
        <div className="z-9 h-11 mt-8 flex flex-row justify-between bg-gray-200 shadow-lg rounded-lg">
            <div>
                <button
                    id="dropdownGenresButton"
                    data-dropdown-toggle="dropdownGenres"
                    data-dropdown-placement="bottom"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    type="button"
                    onClick={handleOpen}
                >
                    Genres{' '}
                    <svg
                        className="w-4 h-4 ml-2"
                        aria-hidden="true"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                        ></path>
                    </svg>
                </button>
                <div
                    id="dropdownGenres"
                    className={`z-10 ${
                        isOpen ? 'block' : 'hidden'
                    } bg-white rounded-lg shadow w-60 dark:bg-gray-700`}
                >
                    <ul
                        className="h-48 py-2 overflow-y-auto text-gray-700 dark:text-gray-200"
                        aria-labelledby="dropdownGenresButton"
                    >
                        {genres.map((item: Genre): JSX.Element => {
                            return (
                                <li>
                                    <h6
                                        onClick={(e) => handleClick(item.id)}
                                        className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 text-black"
                                    >
                                        {item.name}
                                    </h6>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="mb-3 xl:w-96">
                    <input
                        type="search"
                        onChange={props.onSearchChange}
                        className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        id="exampleSearch"
                        placeholder="Search"
                    />
                </div>
            </div>
        </div>
    );
};

export default FilterControls;

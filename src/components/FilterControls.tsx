import React from 'react';

const FilterControls = () => {
    return (
        <div className="bg-gray-200 h-auto shadow-lg rounded-lg">
            <button
                id="dropdownUsersButton"
                data-dropdown-toggle="dropdownUsers"
                data-dropdown-placement="bottom"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="button"
            >
                Project users{' '}
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
                id="dropdownUsers"
                className="z-10 hidden bg-white rounded-lg shadow w-60 dark:bg-gray-700"
            >
                <ul
                    className="h-48 py-2 overflow-y-auto text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownUsersButton"
                >
                    <li>
                        <a
                            href="#"
                            className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                            <img
                                className="w-6 h-6 mr-2 rounded-full"
                                src="/docs/images/people/profile-picture-1.jpg"
                                alt="Jese image"
                            />
                            Jese Leos
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default FilterControls;

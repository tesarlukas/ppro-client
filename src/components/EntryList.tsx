import React from 'react';
import { FilmWork } from '../shared/types';

interface Props {
    entries: Array<FilmWork>;
    markAsWatching?: (id: number) => Promise<Response> | undefined;
    addToPlan?: (id: number) => Promise<Response> | undefined;
    markAsFinished?: (id: number) => Promise<Response> | undefined;
    removeFromWatching?: (id: number) => Promise<Response> | undefined;
    removeFromPlan?: (id: number) => Promise<Response> | undefined;
    removeFromFinished?: (id: number) => Promise<Response> | undefined;
    setEntries: React.Dispatch<React.SetStateAction<FilmWork[]>>;
}

const EntryList: React.FC<Props> = ({
    entries,
    setEntries,
    markAsFinished,
    markAsWatching,
    addToPlan,
    removeFromWatching,
    removeFromPlan,
    removeFromFinished,
}: Props) => {
    return (
        <div className="bg-slate-800 flex flex-wrap flex-col content-center w-full p-4 rounded-xl gap-2">
            {entries.length === 0 ? (
                <div className="flex flex-row flex-wrap items-center bg-slate-900 rounded-xl p-2">
                    <h3 className="text-2xl h-fit p-1">
                        There are no entries in the list
                    </h3>
                </div>
            ) : (
                ''
            )}
            {entries?.map((entry: FilmWork) => {
                return (
                    <div
                        key={entry.id}
                        className="flex flex-row flex-wrap items-center bg-slate-900 rounded-xl p-2 w-9/12"
                    >
                        <div className="flex flex-row w-1/2">
                            <h3 className="text-2xl h-fit mr-12">
                                {entry.name}
                            </h3>
                            <h3 className="text-2xl mr-12">
                                {entry.audienceScore}
                            </h3>
                        </div>
                        <div className="controls flex flex-row justify-end w-1/2">
                            {markAsFinished !== undefined ? (
                                <button
                                    className="bg-lime-600 hover:text-lime-500 hover:bg-white border-none transition ease-in mr-2"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        markAsFinished(entry.id);
                                        setEntries(
                                            entries.filter(
                                                (item: FilmWork) =>
                                                    entry.id !== item.id,
                                            ),
                                        );
                                    }}
                                >
                                    Finished
                                </button>
                            ) : (
                                ''
                            )}
                            {addToPlan ? (
                                <button
                                    className="bg-pink-500 hover:text-pink-500 hover:bg-white border-none transition ease-in"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        addToPlan(entry.id);
                                        setEntries(
                                            entries.filter(
                                                (item: FilmWork) =>
                                                    entry.id !== item.id,
                                            ),
                                        );
                                    }}
                                >
                                    Add to plan
                                </button>
                            ) : (
                                ''
                            )}
                            {markAsWatching ? (
                                <button
                                    className="bg-blue-600 hover:text-blue-600 hover:bg-white border-none transition ease-in"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        markAsWatching(entry.id);
                                        setEntries(
                                            entries.filter(
                                                (item: FilmWork) =>
                                                    entry.id !== item.id,
                                            ),
                                        );
                                    }}
                                >
                                    Mark as watching
                                </button>
                            ) : (
                                ''
                            )}
                            {removeFromWatching ? (
                                <button
                                    className="bg-red-600 hover:text-red-600 hover:bg-white border-none transition ease-in ml-2"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        removeFromWatching(entry.id);
                                        setEntries(
                                            entries.filter(
                                                (item: FilmWork) =>
                                                    entry.id !== item.id,
                                            ),
                                        );
                                    }}
                                >
                                    Remove
                                </button>
                            ) : (
                                ''
                            )}
                            {removeFromFinished ? (
                                <button
                                    className="bg-red-600 hover:text-red-600 hover:bg-white border-none transition ease-in ml-2"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        removeFromFinished(entry.id);
                                        setEntries(
                                            entries.filter(
                                                (item: FilmWork) =>
                                                    entry.id !== item.id,
                                            ),
                                        );
                                    }}
                                >
                                    Remove
                                </button>
                            ) : (
                                ''
                            )}
                            {removeFromPlan ? (
                                <button
                                    className="bg-red-600 hover:text-red-600 hover:bg-white border-none transition ease-in ml-2"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        removeFromPlan(entry.id);
                                        setEntries(
                                            entries.filter(
                                                (item: FilmWork) =>
                                                    entry.id !== item.id,
                                            ),
                                        );
                                    }}
                                >
                                    Remove
                                </button>
                            ) : (
                                ''
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default EntryList;

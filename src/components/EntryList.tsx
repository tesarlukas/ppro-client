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
}

const EntryList: React.FC<Props> = ({
    entries,
    markAsFinished,
    markAsWatching,
    addToPlan,
    removeFromWatching,
    removeFromPlan,
    removeFromFinished,
}: Props) => {
    return (
        <div className="bg-slate-800 flex flex-wrap flex-col content-center w-9/12 p-4 rounded-xl mt-16">
            {entries?.map((entry: FilmWork) => {
                return (
                    <div
                        key={entry.id}
                        className="flex flex-row flex-wrap items-center bg-slate-900 rounded-xl p-2"
                    >
                        <h3 className="text-2xl h-fit mr-12">{entry.name}</h3>
                        <h3 className="text-2xl mr-12">
                            {entry.audienceScore}
                        </h3>
                        {markAsFinished !== undefined ? (
                            <button
                                className="bg-lime-600 hover:text-lime-500 hover:bg-white border-none transition ease-in mr-2"
                                onClick={(e) => {
                                    e.preventDefault();
                                    markAsFinished(entry.id);
                                }}
                            >
                                Watching
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
                                }}
                            >
                                Finished
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
                                }}
                            >
                                Remove
                            </button>
                        ) : (
                            ''
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default EntryList;

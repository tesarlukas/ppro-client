import React from 'react';
import { Review } from '../shared/types';
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';

const Reviews: React.FC<{
    reviews: Array<Review> | undefined;
    deleteReview: (review: number) => Promise<Response>;
    triggerEdit: (id: number) => Promise<Response>;
}> = ({ reviews, deleteReview, triggerEdit }) => {
    return (
        <div className="mt-5 flex flex-wrap justify-center gap-6 w-full">
            {reviews?.map((review: Review) => {
                return (
                    <div
                        key={review.id}
                        className="bg-slate-800 p-2 rounded-2xl max-w-33 h-fit"
                    >
                        <p className="break-words">{review.comment}</p>
                        <div className="flex flex-row">
                            {'- '}
                            <Link
                                to={`/user/${review.user.id}`}
                                className="flex flex-row content-center "
                            >
                                {review.user.username} | {review.score}/10{' '}
                                <FaStar className="ml-1 h-full" />
                            </Link>
                        </div>
                        <div className="controls flex-row flex gap-2 mt-2">
                            <button
                                className="bg-red-700 py-1"
                                onClick={() => deleteReview(review.id)}
                            >
                                Delete
                            </button>
                            <button
                                className="bg-emerald-900 py-1"
                                onClick={() => triggerEdit(review.id)}
                            >
                                Edit
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Reviews;

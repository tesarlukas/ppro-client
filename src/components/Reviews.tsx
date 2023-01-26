import React from 'react';
import { Review, ReviewFormData } from '../shared/types';
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';

const Reviews: React.FC<{
    reviews: Array<Review> | undefined;
    deleteReview: (review: number) => Promise<Response>;
    triggerEdit: (id: number) => Promise<Response>;
}> = ({ reviews, deleteReview, triggerEdit }) => {
    return (
        <>
            {reviews?.map((review: Review) => {
                return (
                    <div
                        key={review.id}
                        className="bg-slate-800 p-2 rounded-2xl"
                    >
                        <div className="flex">
                            {review.comment} {review.score}/10 <FaStar />
                        </div>
                        <div>
                            {'- '}
                            <Link to={`/user/${review.user.id}`}>
                                {review.user.username}
                            </Link>
                        </div>
                        <button
                            className="bg-red-700"
                            onClick={() => deleteReview(review.id)}
                        >
                            Delete
                        </button>
                        <button
                            className="bg-emerald-900"
                            onClick={() => triggerEdit(review.id)}
                        >
                            Edit
                        </button>
                    </div>
                );
            })}
        </>
    );
};

export default Reviews;

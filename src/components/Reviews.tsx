import React from 'react';
import { Review } from '../shared/types';
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';

const Reviews: React.FC<{ reviews: Array<Review> | undefined }> = ({
    reviews,
}) => {
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
                    </div>
                );
            })}
        </>
    );
};

export default Reviews;

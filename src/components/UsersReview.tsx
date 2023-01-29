import React from 'react';
import PropTypes from 'prop-types';
import { Review } from '../shared/types';
import { FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const UsersReview: React.FC<{ review: Review }> = ({ review }) => {
    return (
        <div className="flex flex-col">
            <div className="flex flex-row items-center">
                <Link
                    to={`/filmwork/${review.filmwork?.id}`}
                    className="text-3xl"
                >
                    {review.filmwork?.name}
                </Link>
                <div className="flex flex-row items-center ml-auto">
                    {`${review.score}/10 `}
                    <FaStar className="ml-1 h-full" />
                </div>
            </div>
            <div className="w-full h-[2px] mt-1 mb-1 bg-slate-500"></div>
            <p>{review.comment}</p>
        </div>
    );
};

export default UsersReview;

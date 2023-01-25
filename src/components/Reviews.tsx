import React from 'react';
import { Review } from '../shared/types';
import { Link } from 'react-router-dom';

const Reviews: React.FC<{ reviews: Array<Review> | undefined }> = ({
    reviews,
}) => {
    return (
        <>
            {reviews?.map((review: Review) => {
                return (
                    <div key={review.id}>
                        {review.comment} by{' '}
                        <Link to={`/user/${review.user.id}`}>
                            {review.user.username}
                        </Link>
                    </div>
                );
            })}
        </>
    );
};

export default Reviews;

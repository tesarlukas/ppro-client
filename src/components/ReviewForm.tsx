import React from 'react';
import TextField from './TextField';
import { ReviewFormData, ReviewFormInterface } from '../shared/types';
import { useParams } from 'react-router-dom';

const ReviewForm = () => {
    const { id } = useParams<any>();
    const createReview = async (data: ReviewFormData): Promise<Response> => {
        return fetch(`${import.meta.env.VITE_DEV_API_URL}api/v1/reviews`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
    };

    const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { score, comment } = e.target as typeof e.target &
            ReviewFormInterface;

        const data: ReviewFormData = {
            score: score.value,
            comment: comment.value,
            user: { id: 3 },
            filmwork: { id: id },
        };

        const res = await createReview(data);
        console.log(res);
    };

    return (
        <div className="">
            <form
                onSubmit={handleOnSubmit}
                className="flex flex-col bg-slate-800 p-4 rounded-xl mt-48"
            >
                <h6>Score</h6>
                <TextField type="text" name="score" />
                <h6>Comment</h6>
                <TextField type="text" name="comment" />
                <input
                    className="mt-4 border border-slate-300"
                    type="submit"
                    value="Register"
                ></input>
            </form>
        </div>
    );
};

export default ReviewForm;

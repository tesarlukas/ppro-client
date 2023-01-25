import React from 'react';
import TextField from './TextField';
import { ReviewFormData, ReviewFormInterface } from '../shared/types';
import { useParams } from 'react-router-dom';

const ReviewForm: React.FC<{
    createReview: (data: ReviewFormData) => Promise<Response>;
}> = ({ createReview }) => {
    const { id } = useParams<any>();

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
    };

    return (
        <div className="">
            <form
                onSubmit={handleOnSubmit}
                className="flex flex-col bg-slate-800 p-4 rounded-xl mt-48"
            >
                <h6>Score</h6>
                <select className="bg-slate-600" name="score" id="cars">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                </select>
                <h6>Comment</h6>
                <TextField type="text" name="comment" />
                <input
                    className="mt-4 border border-slate-300"
                    type="submit"
                    value="Create a review"
                ></input>
            </form>
        </div>
    );
};

export default ReviewForm;

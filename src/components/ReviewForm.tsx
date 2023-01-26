import React from 'react';
import TextField from './TextField';
import { ReviewFormData, ReviewFormInterface } from '../shared/types';
import { useParams } from 'react-router-dom';

const ReviewForm: React.FC<{
    createReview: (data: ReviewFormData) => Promise<Response>;
    review?: ReviewFormData;
    setReview: React.Dispatch<React.SetStateAction<ReviewFormData | undefined>>;
    isEditing?: boolean;
    editReview: (data: ReviewFormData) => Promise<Response>;
}> = ({ createReview, review, setReview, editReview, isEditing }) => {
    const { id } = useParams<string>();

    const handleOnSubmit = async (
        e: React.FormEvent<HTMLFormElement>,
    ): Promise<Response> => {
        e.preventDefault();
        const { score, comment } = e.target as typeof e.target &
            ReviewFormInterface;

        const data: ReviewFormData = {
            score: score.value,
            comment: comment.value,
            user: { id: 3 },
            filmwork: { id: id },
        };

        if (isEditing) {
            const data: ReviewFormData = {
                id: review?.id,
                score: score.value,
                comment: comment.value,
                user: { id: 3 },
                filmwork: { id: id },
            };

            const res = await editReview(data);
            return res;
        }
        const res = await createReview(data);
        return res;
    };

    const handleScoreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setReview({
            ...review,
            score: e.target.value as unknown as number,
        } as ReviewFormData);
    };

    const handleCommentChange = (comment: string) => {
        setReview({
            ...review,
            comment: comment,
        } as ReviewFormData);
    };

    return (
        <div className="">
            <form
                onSubmit={handleOnSubmit}
                className="flex flex-col bg-slate-800 p-4 rounded-xl mt-48"
            >
                <h6>Score</h6>
                <select
                    className="bg-slate-600"
                    name="score"
                    id="cars"
                    value={review?.score}
                    onChange={handleScoreChange}
                >
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
                <TextField
                    type="text"
                    name="comment"
                    value={review?.comment}
                    onChange={handleCommentChange}
                />
                <input
                    className="mt-4 border border-slate-300"
                    type="submit"
                    value={isEditing ? 'Edit a review' : 'Create a review'}
                ></input>
            </form>
        </div>
    );
};

export default ReviewForm;

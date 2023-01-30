import React, { useContext } from 'react';
import TextField from './TextField';
import { ReviewFormData, ReviewFormInterface } from '../shared/types';
import { useParams } from 'react-router-dom';
import { UserContext } from '../context';
import { toast } from 'react-toastify';

const ReviewForm: React.FC<{
    createReview: (data: ReviewFormData) => Promise<Response>;
    review?: ReviewFormData;
    setReview: React.Dispatch<React.SetStateAction<ReviewFormData | undefined>>;
    isEditing?: boolean;
    editReview: () => Promise<Response>;
}> = ({ createReview, review, setReview, editReview, isEditing }) => {
    const { id } = useParams<string>();
    const { user } = useContext(UserContext);

    const handleOnSubmit = async (
        e: React.FormEvent<HTMLFormElement>,
    ): Promise<Response> => {
        e.preventDefault();
        const { score, comment } = e.target as typeof e.target &
            ReviewFormInterface;

        const data: ReviewFormData = {
            score: score.value,
            comment: comment.value,
            user: { id: user.id },
            filmwork: { id: id },
        };

        if (isEditing) {
            const res = await editReview();
            return res;
        }
        const res = await createReview(data);
        if (res.status === 417) toast.warn('You have already posted a review');
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
                    className="bg-slate-600 border-slate-300 rounded-sm"
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
                {user.name === '' ? (
                    <input
                        className="mt-4 border border-slate-300 rounded-sm p-2"
                        type="submit"
                        disabled
                        value={'You need to be logged in.'}
                    ></input>
                ) : (
                    <input
                        className="mt-4 border border-slate-300 rounded-sm p-2"
                        type="submit"
                        value={isEditing ? 'Edit a review' : 'Create a review'}
                    ></input>
                )}
            </form>
        </div>
    );
};

export default ReviewForm;

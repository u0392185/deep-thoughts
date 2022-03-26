import React, { useState } from 'react';
import { ADD_REACTION } from '../../utils/mutations';
import { useMutation } from '@apollo/client';

const ReactionForm = ({ thoughtId }) => {

    const [reactionBody, setBody] = useState('');
    const [characterCount, setCharacterCount] = useState(0);

    const [addReaction, { error }] = useMutation(ADD_REACTION);

    const handleChange = event => {
        if (event.target.value.length <= 280) {
            setBody(event.target.value);
            setCharacterCount(event.target.value.length);
        }
    };

    const handleFormSubmit = async event => {
        event.preventDefault();
        setBody('');
        setCharacterCount(0);
        try{
            await addReaction({
                variables: {thoughtId, reactionBody}
            })
        } catch(e) {
            console.log(e)
        }   
    };
    
    return (
        <div>
            <p className="m-0">
                Character Count: {characterCount}/280
            </p>
            {error && <span className="ml-2">Something went wrong...</span>}
            <form 
                className="flex-row justify-center justify-space-between-md align-stretch"
                onSubmit={handleFormSubmit}
            >
                <textarea
                    placeholder="Leave a reaction to this thought..."
                    className="form-input col-12 col-md-9"
                    onChange={handleChange}
                    value={reactionBody}
                ></textarea>

                <button className="btn col-12 col-md-3" type="submit">
                Submit
                </button>
            </form>
        </div>
    );
};

export default ReactionForm;
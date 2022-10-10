
import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_BOARD } from '../utils/mutations';


function Board() {
    //set value of title using useState to null/ initial title to null
    const [title, setTitle] = useState('');
    const [errorMessage, setErrorMessage] = useState('Name is required');
    const [board, {error, data}] = useMutation(ADD_BOARD);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        console.log(title);

        if (!title) {
            e.preventDefault();
            setErrorMessage('Name is required');
            return;
        }
        try {
            const { data } = await board({
                variables: { ...title},
            });
        } catch (error) {
            console.log(e);
        }

        console.log(`Board ${title} created`);
        setTitle('');
       
    };

    const handleInput = (e) => {
        // Getting the value and name of the input which triggered the change
        const { value } = e.target;
        setTitle(value);
    };

    return (
        <main className="flex-row justify-center mb-4">
            <div className="col-12 col-lg-10">
                <div className="card">
                    <h4 className="card-header bg-dark text-light p-2">Create Board</h4>
                    <div className="card-body">
                        { data ? (
                            <link to="/"></link>
                        ): (
                        <form className="form">
                            <input className="form-input" type='text' name="title" onChange={handleInput} value={title} placeholder="Enter Board Title"></input>
                            <button className="btn btn-block btn-info" type="submit" onClick={handleSubmit}>Submit</button>
                        </form >
                        )}
                        {error && (
                            <div className="my-3 p-3 bg-danger text-white">
                                <p >{error.message}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    )

};

export default Board;


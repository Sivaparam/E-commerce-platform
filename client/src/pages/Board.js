import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_BOARD } from '../utils/mutations';
import { Link } from 'react-router-dom';


function Board() {
    //set value of title using useState to null/ initial title to null
    const [bTitle, setbTitle] = useState('');
    const [errorMessage, setErrorMessage] = useState('Name is required');
    const [board, { error, data }] = useMutation(ADD_BOARD);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        console.log(bTitle);

        if (!bTitle) {
            e.preventDefault();
            setErrorMessage('Name is required');
            return;
        }
        try {
            const { data } = await board({
                variables: { bTitle },
            });
           
        } catch (error) {
            console.log(e);
        }
        window.location.assign('/');
        console.log(`Board ${bTitle} created`);
        setbTitle('');

    };

    const handleInput = (e) => {
        // Getting the value and name of the input which triggered the change
        const { value } = e.target;
        setbTitle(value);
    };

    return (

        <main className="flex-row justify-center mb-4">
            <div className="col-12 col-lg-10">
                {data ? (
                   <p>
                   Success! 
                   <Link to="/">back to the homepage.</Link>
                 </p>
                ) : (
                    <div className="card">
                        <h4 className="card-header bg-dark text-light p-2">Create Board</h4>
                        <div className="card-body">

                            <form className="form">
                                <input className="form-input" type='text' name="bTitle" onChange={handleInput} value={bTitle} placeholder="Enter Board Title"></input>
                                
                                <button className="submit-btn" type="submit" onClick={handleSubmit}>Submit</button>
                            </form >

                        </div>
                    </div>
                )}
                {error && (
                    <div className="my-3 p-3 bg-danger text-white">
                        <p >{error.message}</p>
                    </div>
                )}
            </div>
        </main>
    )

};

export default Board;


import React, { useState } from "react";


function Board(props) {
    //set value of title using useState to null/ initial title to null
    const [title, setTitle] = useState('');
    const [error, setError] = useState('');
   

    const handleSubmit = e => {
       
        setError('');
        console.log(title);
     
        if (!title) {
            e.preventDefault();
            setError('Name is required');
             return;
           
          }
        console.log(`Board ${title} created`);
        setTitle('');
        //  
        // props.setTrigger(false);
    };

    const handleInput = (e) => {
        // Getting the value and name of the input which triggered the change
        const { value } = e.target;
        setTitle(value);
       
        
        // e.preventDefault();

    };

    return (props.trigger) ? (
        <div>
            <form className="form">
                <div className="form-group">
                    <label htmlFor="title"> Title: </label>
                </div>
                <div className="form-group">
                    <input type='text' name="title" onChange={handleInput} value={title} placeholder="Enter Board Title"></input>
                </div>
                <div className="form-group">
                    <button type="submit" onClick={handleSubmit}>Submit</button>
                </div>
            </form >
            {error && (
        <div>
          <p >{error}</p>
        </div>
      )}
        </div>
    ) : '';
};

export default Board;


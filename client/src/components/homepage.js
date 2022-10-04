import React, {useState} from "react";
import Board from './Board'

function Homepage() {
const [create, setCreate] = useState(false);


const handleCreate =  (e) => {
    setCreate(true);
};
    
    return (
        <div>
            <p> Agile Board</p>
            <button type="button" onClick={handleCreate}>Create Board</button>
            <Board trigger={create} >
            <h3>Create Board</h3>
            </Board>
        </div>
    )
};

export default Homepage;
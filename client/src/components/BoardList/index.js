import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_MEMBER } from "../../utils/mutations";
import Popup from 'reactjs-popup';

const BoardList = ({ boards }) => {
  const [email, setEmail] = useState('');
  const [addMember, { error }] = useMutation(ADD_MEMBER);
  const [member, setMember] = useState(false);
  if (!boards.length) {
    return <h3> No boards yet</h3>;
  }

  const handleSubmit = async (board) => {


    try {
      const { data } = await addMember({
        variables: { email: email, boardId: board },
      });

      // setEmail('');
    } catch (err) {
      console.error(err);
    }

    setMember(true);
    setEmail('');
  };


  const handleInput = (e) => {
    // Getting the value and name of the input which triggered the change
    const { value } = e.target;
    setEmail(value);
    // e.preventDefault();

  };

  return (
    <>
      <h3 className='text-white'>Your Boards!</h3>

      <div >
        <Link className='btn btn-lg btn-light m-2' to="/board">
          <span> Create Board </span>
        </Link>
      </div>
      <div className='flex-row justify-space-between'>
        {boards &&
          boards.map((board) => (
            <div key={board._id} className="boardContainer mb-3">

              <h6 className="text-light p-1 m-0 boardstyle">
                <Link className="btn btn-lg boardcolor w-100" to={`/list/${board._id}`}>
                  {board.bTitle}
                </Link>

                <Popup trigger={<button type='button' className="btn btn-lg btn-light m-2"> Add Member </button>}
                  position="right center">
                  <form className="form">
                    <input className="form-input" id="email" type='email' name="email" onChange={handleInput} value={email} placeholder="Member Name"></input>
                    <button className="btn btn-light m-1" onClick={() => handleSubmit(board._id)}>Submit</button>
                    {member ? (<p>Group member is added</p>) : <p></p>}
                  </form >
                </Popup>

              </h6>

            </div>
          ))}
      </div>
    </>

  );
};



export default BoardList;






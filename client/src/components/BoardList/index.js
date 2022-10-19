import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { VIEW_MEMBER } from '../../utils/queries';
import { ADD_MEMBER } from "../../utils/mutations";
import Popup from 'reactjs-popup';

import { FaUserFriends } from 'react-icons/fa';
import Member from '../Member';


const BoardList = ({ boards }) => {

  const [email, setEmail] = useState('');
  const [addMember, { error }] = useMutation(ADD_MEMBER);
  const [member, setMember] = useState(false);


  console.log({ boards });

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

  };

  return (
    <>
      <h3 className='text-white'>Your Boards!</h3>

      <div className='flex-row justify-space-between'>

        {boards &&
          boards.map((board) => (
            <div key={board._id} className="boardContainer mb-3">

              <h6 className="text-light p-1 m-0 boardstyle">
                <Link className="btn btn-lg boardcolor w-100" to="/list" state={{ boardParam: board._id }}>
                  {board.bTitle}
                </Link>
                <>
                  <Popup trigger={<button type='button' className="btn btn-lg btn-light m-2"> Add/View <FaUserFriends /></button>}
                    position="right center">
                    <form style={{ background: "#49564d", width: "250px" }} >

                      <input className="form-input" id="email" type='email' name="email" onChange={handleInput} value={email} placeholder="Member Email"></input>
                      <button className="btn btn-light m-1" onClick={() => handleSubmit(board._id)}>Submit</button>
                      {member ? (<p>Group member is added</p>) : <p></p>}
                      <Member boardId={board._id} />
                    </form>
                  </Popup>
                </>
              </h6>
            </div>
          ))}
      </div>
    </>
  );
};

export default BoardList;






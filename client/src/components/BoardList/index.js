import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_MEMBER } from "../../utils/mutations";
import Popup from 'reactjs-popup';

const BoardList = ({ boards }) => {
  const [email, setEmail] = useState('');
  const [addMember, { error }] = useMutation(ADD_MEMBER);
  const [member, setMember ] = useState(false);
  if (!boards.length) {
    return <h3> No boards yet</h3>;
  }

const handleSubmit = async (board) => {
    

    try {
      const { data } = await addMember({
        variables: { email: email, boardId: board},
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
    <div>
      <h3>Your Boards!</h3>
      {boards &&
        boards.map((board) => (
          <div key={board._id} className="card mb-3">
            <h4 className="card-header bg-primary text-light p-2 m-0"> 
              <Link className="btn btn-lg btn-light m-2" to={`/list/${board._id}`}>
                {board.bTitle}
              </Link>
                <Popup trigger={<button type='button' className="btn btn-lg btn-light m-2"> Add Member </button>} 
     position="right center">
                      <form className="form">
                                        <input className="form-input" id="email" type='email' name="email" onChange={handleInput} value={email} placeholder="Member Name"></input>
                                       <button className="btn btn-light m-1" onClick={() => handleSubmit(board._id)}>Submit</button>
                                      {member ? (<p>Group member is added</p>) : <p></p> }
                                    </form >
      {/* <div className='form-group' style={{width:'400px',height:'100px',border:'1px solid black',background:'white'}}> */}
        {/* <label style={{marginTop:'30px'}}htmlFor='Email'>Email:</label>
        <input type="email" name="email" value={email} onChange={handleInput} id="email"></input>
        <button onClick= {() => handleSubmit(board._id)}>Add Member</button> */}
      {/* </div> */}
    </Popup>
             </h4> 
           
           {/* <Link className="btn btn-lg btn-light m-2" to={`/list/${board._id}`}> */}
       
    
              {/* </Link> */}
              
          </div>
        ))}
    </div>
  );
};



export default BoardList;






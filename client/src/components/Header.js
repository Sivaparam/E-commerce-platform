import React, {useState} from 'react';
import { Link } from 'react-router-dom';
// import '../../styles/header.css';
import Auth from '../utils/auth';



const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  const [create, setCreate] = useState(false);
  const handleCreate =  (e) => {
    setCreate(true);
};

  return (


   
   <div className="navigation-bar">
  <div className='navTitle'>
    <h1>
      Agile Board
    </h1>
  </div>
      <div>
        {Auth.loggedIn() ? (
          <>
        <ul>   
          <li className='list active'>
          <a>
         <Link to="/">
          <span className='text'> Home</span>
          </Link>
          </a>
        </li>
          <li className='list'>
           <a>
          <button className="btn btn-lg btn-light m-2" onClick={logout}>
          <span className='text' >  Logout</span>
          </button>
          </a>
          </li>
          </ul>
          
          </>
        ) : (
          <>
           <ul>
            <li className='list'>
              <a>
              <Link to="/login">
                <span className='icon'>LogIn</span>
                <span className='text'>  Login</span>
              </Link>
              </a>
                </li>
                  <li className='list'>
                    <a>
                    <Link to="/signup">
                    <span className='icon'>SignUp</span>
                    <span className='text'> Signup</span>
                    </Link>
                    </a>
                    </li>
                    <div className="indicator"></div>
              </ul>
           
           
           
          </>
        )}
      </div>
 
 </div>
   

  );
};

export default Header;

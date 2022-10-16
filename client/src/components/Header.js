import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
// import '../../styles/header.css';
import Auth from '../utils/auth';

import '../pages/style/style.css';


const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  const [create, setCreate] = useState(false);
  const handleCreate =  (e) => {
    setCreate(true);
};

useEffect(()=>{
  const script = document.createElement('script');

  script.src="./testIndicator.js";
  script.async=true;
  
  document.body.appendChild(script);

  return()=>{
    document.body.removeChild(script);
  }
},[]);


  return (
    <div className="navigation-bar">
        <div className='navTitle'>
          <h1 className="m-0" >
            Agile Board
          </h1>      
        </div>
          {Auth.loggedIn() ? (
            <>
            <ul>
            <li className='list active'>
              <a>
              <Link to="/board">
               <span className='text'>   Create Board</span>
             </Link>
            </a>
            </li>
            
            <li className='list'>
              <a>
              <button onClick={logout}>
               <span className='text' >  Logout</span>
             </button>
             </a>
            </li>
          </ul>
            </>
          ) : (
            <>
            <ul>
              <li className='list login'>
                <a>
              <Link to="/login">
              <span className='icon'>LogIn</span>
              <span className='text'>  Login</span>
              </Link>
               </a>
              </li>
                <li>
                  
                </li>
              <li className='list'>
                <a>
              <Link to="/signup">
              <span className='icon'>SignUp</span>
              <span className='text'> Signup</span> 
              </Link>
                </a>
              </li>
              <div class="indicator"></div>
            </ul>
            </>
          )}
    </div>
  );
};








export default Header;

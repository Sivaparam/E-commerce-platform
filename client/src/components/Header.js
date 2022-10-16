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
    
    <div class="navigation-bar">
    <div class='navTitle'>
      <h1>
        Agile Board
      </h1>
    </div>


        <div>
          {Auth.loggedIn() ? (
            <>
          <ul>   
            <li class='list active'>
            <a>
           <Link class="btn btn-lg btn-light m-2" to="/">
            <span class='text'> Home</span>
            </Link>
            </a>
          </li>
            <li class='list'>
             <a>
            <button class="btn btn-lg btn-light m-2" onClick={logout}>
            <span class='text' >  Logout</span>
            </button>
            </a>
            </li>
            </ul>
            
            </>
          ) : (
            <>
             <ul>
              <li class='list'>
                <a>
                <Link to="/login">
                  <span class='icon'>LogIn</span>
                  <span class='text'>  Login</span>
                </Link>
                </a>
                  </li>
                    <li class='list'>
                      <a>
                      <Link to="/signup">
                      <span class='icon'>SignUp</span>
                      <span class='text'> Signup</span>
                      </Link>
                      </a>
                      </li>
                      <div class="indicator"></div>
                </ul>
             
             
             
            </>
          )}
        </div>
   
   </div>
  );
};

export default Header;

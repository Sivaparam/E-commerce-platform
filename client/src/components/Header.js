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
    <header className="p-3 mb-2 bg-primary text-white"  >
      <div className="container flex-row justify-space-between-lg justify-center align-center" >
        <div>
          <h1 className="m-0" style={{ fontSize: '3rem' }}>
            Agile Board
          </h1>
          <p className="m-0"> Manage Your Project </p>
                    
        </div>
        <div>
          {Auth.loggedIn() ? (
            <>
            <div>
            <Link className="btn btn-lg btn-light m-2" to="/board">
               Create Board
            </Link>
            </div>
            
            <button className="btn btn-lg btn-light m-2" onClick={logout}>
              Logout
            </button>
            </>
          ) : (
            <>
              <Link className="btn btn-lg btn-primary m-2" to="/login">
                Login
              </Link>
              <Link className="btn btn-lg btn-light m-2" to="/signup">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

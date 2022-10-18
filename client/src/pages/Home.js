import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import Auth from '../utils/auth';
import { Link } from 'react-router-dom';
import { USER_BOARDS } from '../utils/queries';
import BoardList from '../components/BoardList';

function Home() {
  const { loading, data } = useQuery(USER_BOARDS);
  console.log(data);


  const userBoards = data?.userBoards || [];

  return (

    <main className="flex-row mb-4">

      {Auth.loggedIn() ? (
        <div className='w-100'>
          <div >
            <Link className='btn btn-lg btn-light m-2' to="/board">
              <span> Create Board </span>
            </Link>
          </div>
          {loading ? (
            <div> Loading...</div>
          ) : (

            <BoardList boards={userBoards.boards} />

          )}
        </div>
      ) : (
        <div>
          <p> Please login/signup </p>
        </div>
      )}

    </main>
  );
};

export default Home;

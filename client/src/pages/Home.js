import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import Auth from '../utils/auth';
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
            {loading ? (
              <div> Loading...</div>
            ) : (

              <BoardList boards= {userBoards.boards} />

            )}
          </div>
        ) : (
          
          <div class="landingpage">
<div class="container">
    <div class="intro">
        <h3 class="intro-title">planning made easy</h3>
            <p>
                From business, school or personal goals our boards will help. Development awaits,Sign up or login to get started.
            </p>
            <p>
                Login or signup, its free!
            </p>
    </div>
    </div>
    </div>
          
        )}
    
    </main>
  );
};

export default Home;

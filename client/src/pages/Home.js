import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import Auth from '../utils/auth';
import { USER_BOARDS } from '../utils/queries';
import BoardList from '../components/BoardList';

import '../pages/style/style.css';


function Home() {
  const { loading, data } = useQuery(USER_BOARDS);
  console.log(data);
  

  const userBoards = data?.userBoards || [];

  return (
    
    <main 
    className="flex-row justify-center"
    >
      <div >

        {Auth.loggedIn() ? (
          <div>
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
          <div className="landingPage">
            <div className="landingContent">
          <img src='https://t3.ftcdn.net/jpg/04/53/15/70/240_F_453157099_WDyakeU2ZoDdLDnfH8gVlhy4zI5fgcwX.jpg' width={300} height={250}></img>
            </div>
          </div>
          </div>
          </div>
          </div>
          
        )}
      </div>
    </main>
  );
};

export default Home;

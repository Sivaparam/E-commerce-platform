import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import Auth from '../utils/auth';
import { USER_BOARDS } from '../utils/queries';

function Home() {

  return (
    <div>
      {Auth.loggedIn() ? (
        <>
      <section>
        <h2>Welcome!</h2>
        <h3>Your Boards!</h3>
        <div>
          Display user boards
        </div>
      </section>
      <section>
        <p> Add list </p>
      </section>
      </>
      ) : ( 
        <div>
          <p>Please login/signup</p>
          </div>
      )}
    </div>
  );
};

export default Home;

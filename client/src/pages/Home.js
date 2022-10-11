import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import Auth from '../utils/auth';
import { USER_BOARDS } from '../utils/queries';
import BoardList from '../components/BoardList';

function Home() {
  const { loading, data } = useQuery(USER_BOARDS);
  console.log(data);
  const users = data?.users || [];

  return (
    <main>
      <div>
        {Auth.loggedIn() ? (
          <div>
            {loading ? (
              <div> Loading...</div>
            ) : (
              <BoardList boards= {users.boards} />
            )}
          </div>
        ) : (
          <div>
            <p> Please login/signup </p>
          </div>
        )}
      </div>
    </main>
  );
};

export default Home;

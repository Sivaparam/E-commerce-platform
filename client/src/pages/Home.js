import React,{useState} from 'react';
import { useQuery } from '@apollo/client';
import Board from '../pages/Board'
import { QUERY_USERS } from '../utils/queries';

const   Home = () => {
  const { loading, data } = useQuery(QUERY_USERS);
  const profiles = data?.profiles || [];
  const [create, setCreate] = useState(false);


const handleCreate =  (e) => {
    setCreate(true);
};

  return (
    <main>
      <div>
            <p> Agile Board</p>
            <button type="button" onClick={handleCreate}>Create Board</button>
            <Board trigger={create} >
            <h3>Create Board</h3>
            </Board>
        </div>
      {/* <div className="flex-row justify-center">
        <div className="col-12 col-md-10 my-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ProfileList
              profiles={profiles}
              title="Here's the current roster of friends..."
            />
          )}
        </div>
      </div> */}
    </main>
  );
};

export default Home;

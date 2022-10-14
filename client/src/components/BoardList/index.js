import React from 'react';
import { Link } from 'react-router-dom';

const BoardList = ({ boards }) => {
  if (!boards.length) {
    return <h3> No boards yet</h3>;
  }

  return (
    <div>
      <h3>Your Boards!</h3>
      {boards &&
        boards.map((board) => (
          <div key={board._id} className="card mb-3">
            <h4 className="card-header bg-primary text-light p-2 m-0">
              <Link className="btn btn-lg btn-light m-2" to={`/list/${board._id}`}>
                {board.bTitle}
              </Link>

            </h4>

          </div>
        ))}
    </div>
  );
};



export default BoardList;






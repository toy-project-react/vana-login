import JoinContainer from 'containers/JoinContainer';
import React from 'react';

const Join = () => {
  return (
    <div className="login">
      <div className="box">
        <h1>
          <span className="blind">Join</span>
        </h1>
        <JoinContainer />
      </div>
    </div>
  );
};

export default Join;

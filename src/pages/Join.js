import React from 'react';
import JoinContainer from 'containers/JoinContainer';

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

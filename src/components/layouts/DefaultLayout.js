import AuthContainer from 'containers/AuthContainer';
import React from 'react';
const DefaultLayout = props => {
  return (
    <section>
      <div className="admin">
        <AuthContainer></AuthContainer>
        <div className={`container min} `}>
          <div className="wrap">{props.children}</div>
        </div>
      </div>
    </section>
  );
};
export default DefaultLayout;

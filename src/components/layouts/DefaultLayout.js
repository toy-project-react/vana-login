import React from 'react';
import AuthContainer from 'containers/AuthContainer';
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

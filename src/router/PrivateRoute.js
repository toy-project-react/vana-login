import { Redirect, Route } from 'react-router-dom';

import React from 'react';
import { connect } from 'react-redux';

const PrivateRoute = props => {
  const Page = props.page;
  const {
    auth: { authentication, token }
  } = props;
  return (
    <Route
      {...props}
      render={props => {
        if (authentication && token) {
          return <Page {...props} />;
        } else {
          return <Redirect to="/login" />;
        }
      }}
    ></Route>
  );
};

const mapStateToProps = (state, props) => {
  return {
    ...state,
    ...props
  };
};

export default connect(mapStateToProps)(PrivateRoute);

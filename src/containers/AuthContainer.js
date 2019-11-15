import React, { Component } from 'react';

import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { requestLogout } from 'modules/auth';

function mapStateToProps(state) {
  return {
    userInfo: state.auth.userInfo,
    token: state.auth.token,
    authentication: state.auth.authentication
  };
}

function mapDispatchToProps(dispatch) {
  return {
    requestLogout: () => dispatch(requestLogout())
  };
}

class AuthContainer extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return this.prop !== nextProps || this.state !== nextState;
  }

  render() {
    const children = React.Children.map(this.props.children, child => {
      return React.cloneElement(child, { ...this.props });
    });
    const { authentication, token } = this.props;
    if (authentication && token) {
      return <React.Fragment>{children}</React.Fragment>;
    } else {
      return (
        <Redirect
          to={{
            pathname: '/login'
          }}
        />
      );
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthContainer);

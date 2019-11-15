import React, { Component } from 'react';

import LoginPresenter from './LoginPresenter';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { requestLogin } from 'modules/auth';
import { resetError } from 'modules/noti';

const mapStateToProps = state => ({
  authentication: state.auth.authentication,
  token: state.auth.token,
  errorData: state.noti.error
});

const mapDispatchToProps = dispatch => ({
  requestLogin: loginForm => dispatch(requestLogin(loginForm)),
  resetError: () => dispatch(resetError())
});

class LoginContainer extends Component {
  componentDidMount() {
    this.handleErrorReset();
  }

  submitLoginForm = formData => {
    const { requestLogin } = this.props;
    requestLogin({
      data: { ...formData }
    });
  };
  handleErrorReset = () => {
    this.props.resetError();
  };
  render() {
    const { token, authentication, errorData } = this.props;
    if (authentication && token) {
      return (
        <Redirect
          to={{
            pathname: '/dashboard'
          }}
        />
      );
    } else {
      return (
        <LoginPresenter
          onSubmit={this.submitLoginForm}
          errorData={errorData}
        ></LoginPresenter>
      );
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);

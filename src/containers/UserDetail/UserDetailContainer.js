import * as authActions from 'modules/auth';
import * as notiActions from 'modules/noti';
import * as usersActions from 'modules/users';

import React, { Component } from 'react';

import UserDetailPresenter from './UserDetailPresenter';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  email: state.auth.email,
  userDetail: state.users.userDetail,
  errorData: state.noti.error,
  loading: state.noti.loading
});

const mapDispatchToProps = dispatch => ({
  UsersActions: bindActionCreators(usersActions, dispatch),
  AuthActions: bindActionCreators(authActions, dispatch),
  NotiActions: bindActionCreators(notiActions, dispatch)
});

class UserDetailContainer extends Component {
  state = {
    newUserForm: null
  };
  handleFetchInfo = () => {
    const { UsersActions, location } = this.props;
    UsersActions.requestFetchUserInfo({
      data: { email: location.state.email }
    });
  };

  handleOpenChangePassword = e => {
    e.preventDefault(); // 자동 submit 방지.
    const { NotiActions } = this.props;
    NotiActions.openPopup({
      type: 'ch-pwd',
      onSubmit: this.handleChangePassword
    });
  };

  handleChangePassword = pwForm => {
    const { AuthActions, email, NotiActions } = this.props;
    AuthActions.requestSetPassword({
      data: { ...pwForm, email, isChange: true },
      popup: {
        type: 'confirm',
        title: '비밀번호 변경 완료',
        text: '비밀번호 변경이 성공적으로 완료되었습니다.',
        onSubmit: () => NotiActions.closePopup()
      }
    });
  };

  handleNoAccess = userForm => {
    this.setState({ newUserForm: userForm });
    this.handleErrorReset();
    const { NotiActions } = this.props;
    NotiActions.openPopup({
      type: 'otp',
      onSubmit: this.handleVerifyOTP
    });
  };

  handleVerifyOTP = otpForm => {
    const { AuthActions, email } = this.props;
    AuthActions.requestVerifyOTP({
      data: { ...otpForm, email },
      callback: () => this.handleUpdateUser()
    });
  };

  handleErrorReset = () => {
    this.props.NotiActions.resetError();
  };

  handleUpdateUser = () => {
    const userForm = this.state.newUserForm;
    const { AuthActions, NotiActions } = this.props;
    AuthActions.requestUpdateUser({
      data: { ...userForm, isChange: true },
      popup: {
        title: '저장완료',
        type: 'confirm',
        text: '사용자 정보가 변경되었습니다.',
        onSubmit: () => NotiActions.closePopup()
      }
    });
  };

  componentDidMount() {
    this.handleFetchInfo();
  }
  render() {
    return (
      <UserDetailPresenter
        {...this.props}
        onSubmit={this.handleNoAccess}
        openChangePassword={this.handleOpenChangePassword}
      />
    );
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserDetailContainer);

import React, { Component } from 'react';

import UsersPresenter from './UsersPresenter';
import { changeInit } from 'modules/noti';
import { connect } from 'react-redux';
import { requestFetchUsers } from 'modules/users';

const mapStateToProps = state => ({
  userInfo: state.auth.userInfo,
  userList: state.users.userList,
  loading: state.noti.loading,
  params: state.noti.params
});

const mapDispatchToProps = dispatch => ({
  requestFetchUsers: payload => dispatch(requestFetchUsers(payload)),
  changeInit: () => dispatch(changeInit())
});

class UsersContainer extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return this.prop !== nextProps || this.state !== nextState;
  }

  handleFetchUsers = params => {
    const { requestFetchUsers } = this.props;
    requestFetchUsers({ data: { params: { ...params } } });
  };

  componentDidMount() {
    this.props.changeInit();
    this.handleFetchUsers();
  }
  render() {
    return (
      <UsersPresenter
        {...this.props}
        onChangePagination={this.handleFetchUsers}
      />
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);

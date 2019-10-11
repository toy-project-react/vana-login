import React, { Component } from 'react';
import { connect } from 'react-redux';
import JoinPresenter from './JoinPresenter';
import { requestRegistUser } from 'modules/auth';
import { resetError } from 'modules/noti';

const mapStateToProps = state => ({
  authentication: state.auth.authentication,
  token: state.auth.token,
  errorData: state.noti.error
});

const mapDispatchToProps = dispatch => ({
  requestRegistUser: addUserForm => dispatch(requestRegistUser(addUserForm)),
  resetError: () => dispatch(resetError())
});

class JoinContainer extends Component {
  componentDidMount() {
    this.handleErrorReset();
  }

  submitAddUserForm = formData => {
    const { requestRegistUser } = this.props;
    requestRegistUser({
      data: { ...formData }
    });
  };
  handleErrorReset = () => {
    this.props.resetError();
  };
  render() {
    const { errorData } = this.props;
    return (
      <JoinPresenter
        onSubmit={this.submitAddUserForm}
        errorData={errorData}
      ></JoinPresenter>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(JoinContainer);

import React, { Component } from 'react';
import { closePopup } from 'modules/noti';
import { connect } from 'react-redux';
import { Alerts, ConfirmOk } from 'components/Alerts';
import PasswordForm from 'components/settings/PasswordForm';

const mapStateToProps = state => ({
  isOpenPopup: state.noti.isOpenPopup,
  popup: state.noti.popup,
  error: state.noti.error
});
const mapDispatchToProps = dispatch => ({
  closePopup: () => dispatch(closePopup())
});

class NotificationContainer extends Component {
  handleClosePopup = () => {
    const { closePopup } = this.props;
    closePopup();
  };
  render() {
    const { isOpenPopup, popup, error } = this.props;
    if (isOpenPopup) {
      return (
        <Alerts
          isConfirm={popup.type === 'confirm'}
          onClose={this.handleClosePopup}
        >
          {popup.type === 'confirm' ? (
            <ConfirmOk {...popup}></ConfirmOk>
          ) : popup.type === 'ch-pwd' ? (
            <PasswordForm
              {...popup}
              isChange={true}
              errorData={error}
            ></PasswordForm>
          ) : popup.type === 'error' ? (
            error.message
          ) : (
            popup.text
          )}
        </Alerts>
      );
    } else {
      return null;
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationContainer);

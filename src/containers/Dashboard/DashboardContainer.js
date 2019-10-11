import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DashboardPresenter from './DashboardPresenter';

const mapStateToProps = state => ({});

class DashboardContainer extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return this.props !== nextProps || this.state !== nextState;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.location.key !== this.props.location.key) {
      this.handleFetchData();
    }
  }

  handleFetchData = () => {};

  componentDidMount() {
    this.handleFetchData();
  }

  render() {
    return <DashboardPresenter {...this.props} />;
  }
}
export default connect(mapStateToProps)(DashboardContainer);

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import LogRocket from 'logrocket';

import authApi from '../api/authApi';

import LoadingContainer from '../containers/LoadingContainer';
import HeaderContainer from '../containers/HeaderContainer';
import DetailsContainer from '../containers/DetailsContainer';
import MenuContainer from '../containers/MenuContainer';
import CoinListContainer from '../containers/CoinListContainer';

import '../styles/global.scss';

class App extends Component {
  async componentDidMount() {
    authApi.auth.onAuthStateChanged(async user => {
      if (user) {
        this.props.setInitialState(user);

        if (process.env.NODE_ENV === 'production') {
          LogRocket.identify(user.uid, {
            name: user.displayName,
            email: user.email
          });
        }
      }
    });
  }

  login = async () => {
    this.props.showLoader();
    const user = await authApi.login();

    if (user) {
      this.props.setUserDetails(user);
    }

    this.props.hideLoader();
  };

  logout = async () => {
    this.props.showLoader();
    await authApi.logout();
  };

  render() {
    return (
      <Fragment>
        <LoadingContainer />
        <MenuContainer />
        <HeaderContainer login={this.login} logout={this.logout} />
        <DetailsContainer />
        <CoinListContainer />
      </Fragment>
    );
  }
}

App.propTypes = {
  loading: PropTypes.bool.isRequired,
  showLoader: PropTypes.func.isRequired,
  hideLoader: PropTypes.func.isRequired,
  setInitialState: PropTypes.func.isRequired
};

export default withRouter(App);

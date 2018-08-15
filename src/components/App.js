import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import queryString from 'qs';
import LogRocket from 'logrocket';

import auth, { login, logout } from '../api/authApi';
import { getCoins } from '../api/coinApi';
// import { addOwned, removeOwned } from '../api/ownedApi';
import coinHelper from '../helpers/coinHelper';

import LoadingContainer from '../containers/LoadingContainer';
import HeaderContainer from '../containers/HeaderContainer';
import DetailsContainer from '../containers/DetailsContainer';
import MenuContainer from '../containers/MenuContainer';
import CoinListContainer from '../containers/CoinListContainer';

import '../styles/global.scss';
import styles from '../styles/App.module.scss';

class App extends Component {
  async componentDidMount() {
    const {
      showLoader,
      hideLoader,
      statuses,
      setAllFilters,
      addAllCoins,
      filterCoins,
      setUserDetails
    } = this.props;

    auth.onAuthStateChanged(async user => {
      showLoader();

      if (user) {
        const coins = await getCoins(user.uid);
        const denominations = coinHelper.getDenominations(coins);
        const {
          denomination = denominations[0],
          status = statuses[0]
        } = queryString.parse(this.props.location.search.slice(1));

        addAllCoins(coins);
        setAllFilters({ status, denomination, denominations });
        filterCoins();
        setUserDetails(user);

        if (process.env.NODE_ENV === 'production') {
          LogRocket.identify(user.uid, {
            name: user.displayName,
            email: user.email
          });
        }
      }

      hideLoader();
    });
  }

  updateUrl = () => {
    const { status, denomination } = this.props;
    const search = queryString.stringify({ status, denomination });
    this.props.history.push({ search });
  };

  login = async () => {
    this.props.showLoader();
    const user = await login();

    if (user) {
      this.props.setUserDetails(user);
    }

    this.props.hideLoader();
  };

  logout = async () => {
    this.props.showLoader();
    await logout();
    this.setState(this.defaultState);
  };

  render() {
    const { menuOpen, user } = this.props;

    return (
      <Fragment>
        <LoadingContainer />

        {user && <MenuContainer />}

        <HeaderContainer
          title="Coinsly"
          user={user}
          login={this.login}
          logout={this.logout}
        />

        <DetailsContainer />

        <div
          className={`${styles.contentWrapper} ${
            menuOpen ? styles.contentWrapper__spacingLeft : ''
          }`}
        >
          {user && (
            <CoinListContainer handleOwnedChange={this.handleOwnedChange} />
          )}
        </div>
      </Fragment>
    );
  }
}

export default withRouter(App);

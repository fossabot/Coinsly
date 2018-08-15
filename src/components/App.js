import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import queryString from 'qs';
import LogRocket from 'logrocket';

import auth, { login, logout } from '../api/authApi';
import { getCoins } from '../api/coinApi';
import { addOwned, removeOwned } from '../api/ownedApi';
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

        setAllFilters({ status, denomination, denominations });
        addAllCoins(coins);
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

  componentDidUpdate() {
    const {
      coins,
      filteredCoins,
      status,
      denomination,
      setFilteredCoins
    } = this.props;

    const newFilteredCoins = coinHelper.filterCoins(
      coins,
      status,
      denomination
    );

    const filterChanged =
      JSON.stringify(newFilteredCoins) !== JSON.stringify(filteredCoins);

    if (filterChanged) {
      setFilteredCoins(newFilteredCoins);
      this.updateUrl();
    }
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

  handleOwnedChange = async e => {
    this.props.showLoader();
    const { checked, value: coinId } = e.target;
    const { coins, addAllCoins, user } = this.props;
    let newCoinsState;

    if (checked) {
      const ownedId = await addOwned(user.uid, coinId);
      newCoinsState = coinHelper.addOwnedId(coins, coinId, ownedId);
    } else {
      await removeOwned(user.uid, coinId);
      newCoinsState = coinHelper.removeOwnedId(coins, coinId);
    }

    addAllCoins(newCoinsState);
    this.props.hideLoader();
  };

  render() {
    const { menuOpen, coins, filteredCoins, user } = this.props;

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

        <DetailsContainer user={user} coins={coins} />

        <div
          className={`${styles.contentWrapper} ${
            menuOpen ? styles.contentWrapper__spacingLeft : ''
          }`}
        >
          {user && (
            <CoinListContainer
              coins={filteredCoins}
              handleOwnedChange={this.handleOwnedChange}
            />
          )}
        </div>
      </Fragment>
    );
  }
}

export default withRouter(App);

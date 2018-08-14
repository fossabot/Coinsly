import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import queryString from 'qs';
import LogRocket from 'logrocket';

import auth, { login, logout } from '../api/authApi';
import { getCoins } from '../api/coinApi';
import { addOwned, removeOwned } from '../api/ownedApi';
import coinHelper from '../helpers/coinHelper';

import LoadingContainer from '../containers/LoadingContainer';
import Header from './Header';
import Details from './Details';
import MenuContainer from '../containers/MenuContainer';
import CoinListContainer from '../containers/CoinListContainer';
import '../styles/global.scss';
import styles from '../styles/App.module.scss';

class App extends Component {
  defaultState = {
    user: null,
    menuOpen: false,
    coins: [],
    filteredCoins: []
  };

  state = this.defaultState;

  async componentDidMount() {
    const { showLoader, hideLoader, statuses, updateAllFilters } = this.props;

    auth.onAuthStateChanged(async user => {
      showLoader();

      if (user) {
        const coins = await getCoins(user.uid);
        const denominations = coinHelper.getDenominations(coins);

        const {
          denomination = denominations[0],
          status = statuses[0]
        } = queryString.parse(this.props.location.search.slice(1));

        updateAllFilters({ status, denomination, denominations });

        this.setState({
          user,
          coins
        });

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
    const { coins, filteredCoins } = this.state;
    const { status, denomination } = this.props;
    const newFilteredCoins = coinHelper.filterCoins(
      coins,
      status,
      denomination
    );
    const filterChanged =
      JSON.stringify(newFilteredCoins) !== JSON.stringify(filteredCoins);

    if (filterChanged) {
      this.setState({ filteredCoins: newFilteredCoins }, () =>
        this.updateUrl()
      );
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
      this.setState({ user });
    }

    this.props.hideLoader();
  };

  logout = async () => {
    this.props.showLoader();
    await logout();
    this.setState(this.defaultState);
  };

  handleMenuToggle = () => {
    this.setState(({ menuOpen }) => ({
      menuOpen: !menuOpen
    }));
  };

  handleOwnedChange = async e => {
    this.props.showLoader();
    const { checked, value: coinId } = e.target;
    const { user, coins } = this.state;
    let newCoinsState;

    if (checked) {
      const ownedId = await addOwned(user.uid, coinId);
      newCoinsState = coinHelper.addOwnedId(coins, coinId, ownedId);
    } else {
      await removeOwned(user.uid, coinId);
      newCoinsState = coinHelper.removeOwnedId(coins, coinId);
    }

    this.setState({ coins: newCoinsState });
    this.props.hideLoader();
  };

  render() {
    const {
      user,
      menuOpen,
      coins,
      filteredCoins
    } = this.state;

    return (
      <Fragment>
        <LoadingContainer />

        {user && (
          <MenuContainer
            menuOpen={menuOpen}
          />
        )}

        <Header
          title="Coinsly"
          user={user}
          login={this.login}
          logout={this.logout}
          handleMenuToggle={this.handleMenuToggle}
        />

        <Details user={user} coins={coins} />

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

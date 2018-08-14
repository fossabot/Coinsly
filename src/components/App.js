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
import Menu from './Menu';
import CoinListContainer from '../containers/CoinListContainer';
import '../styles/global.scss';
import styles from '../styles/App.module.scss';

class App extends Component {
  defaultState = {
    user: null,
    menuOpen: false,
    coins: [],
    filteredCoins: [],
    filter: '',
    filters: ['All', 'Needed', 'Owned'],
    denominations: [],
    denomination: ''
  };

  state = this.defaultState;

  async componentDidMount() {
    const { showLoader, hideLoader } = this.props;

    auth.onAuthStateChanged(async user => {
      showLoader();

      if (user) {
        const coins = await getCoins(user.uid);
        const denominations = coinHelper.getDenominations(coins);
        const { filters } = this.state;

        const {
          denomination = denominations[0],
          filter = filters[0]
        } = queryString.parse(this.props.location.search.slice(1));

        this.setState({
          user,
          coins,
          filters,
          filter,
          denominations,
          denomination
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
    const { filter, denomination, coins, filteredCoins } = this.state;
    const newFilteredCoins = coinHelper.filterCoins(
      coins,
      filter,
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
    const { filter, denomination } = this.state;
    const search = queryString.stringify({ filter, denomination });
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

  handleFilterChange = e => {
    const filter = e.target.value;
    this.setState({ filter });
  };

  handleDenominationChange = e => {
    const denomination = e.target.value;
    this.setState({ denomination });
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
      filteredCoins,
      filters,
      filter,
      denominations,
      denomination
    } = this.state;

    return (
      <Fragment>
        <LoadingContainer />

        {user && (
          <Menu
            menuOpen={menuOpen}
            filters={filters}
            filter={filter}
            handleFilterChange={this.handleFilterChange}
            denominations={denominations}
            denomination={denomination}
            handleDenominationChange={this.handleDenominationChange}
          />
        )}

        <Header
          title="Coinsly"
          user={user}
          login={this.login}
          logout={this.logout}
          handleMenuToggle={this.handleMenuToggle}
        />

        <Details user={user} coins={coins} denomination={denomination} />

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

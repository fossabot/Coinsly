import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import queryString from 'qs';

import auth, { login, logout } from '../api/authApi';
import { getCoins } from '../api/coinApi';
import { addOwned, removeOwned } from '../api/ownedApi';
import coinHelper from '../helpers/coinHelper';

import Loading from './Loading';
import Header from './Header';
import Details from './Details';
import Menu from './Menu';
import CoinList from './CoinList';
import { ContentWrapper } from '../styles';
import LoadingContext from '../context/loadingContext';

class App extends Component {
  defaultState = {
    user: null,
    isLoading: false,
    menuOpen: false,
    coins: [],
    filter: '',
    filters: [],
    denominations: [],
    denomination: ''
  };

  state = this.defaultState;

  setDefaultState = () => {
    this.setState(this.defaultState);
  };

  showLoader = () => {
    this.setState({ isLoading: true });
  };

  hideLoader = () => {
    this.setState({ isLoading: false });
  };

  async componentDidMount () {
    auth.onAuthStateChanged(async user => {
      this.showLoader();

      if (user) {
        const coins = await getCoins(user.uid);
        const denominations = coinHelper.getDenominations(coins);
        const filters = ['All', 'Needed', 'Owned'];

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
      }

      this.hideLoader();
    });
  }

  login = async () => {
    this.showLoader();
    const user = await login();

    if (user) {
      this.setState({ user });
    }

    this.hideLoader();
  };

  logout = async () => {
    this.showLoader();
    await logout();
    this.setDefaultState();
  };

  handleMenuToggle = () => {
    this.setState(({ menuOpen }) => ({
      menuOpen: !menuOpen
    }));
  };

  updateUrl = () => {
    const { filter, denomination } = this.state;
    const search = queryString.stringify({ filter, denomination });
    this.props.history.push({ search });
  }

  handleFilterChange = e => {
    const filter = e.target.value;
    this.setState({ filter }, () => this.updateUrl());
  };

  handleDenominationChange = e => {
    const denomination = e.target.value;
    this.setState({ denomination }, () => this.updateUrl());
  };

  handleOwnedChange = async e => {
    this.showLoader();
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
    this.hideLoader();
  };

  render () {
    const {
      user,
      isLoading,
      menuOpen,
      coins,
      filters,
      filter,
      denominations,
      denomination
    } = this.state;

    return (
      <LoadingContext.Provider value={isLoading}>
        <Loading />

        {user && (
          <Menu
            menuOpen={menuOpen}
            user={user}
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

        <ContentWrapper menuOpen={menuOpen}>
          {user && (
            <CoinList
              coins={coins}
              denomination={denomination}
              filter={filter}
              handleOwnedChange={this.handleOwnedChange}
            />
          )}
        </ContentWrapper>
      </LoadingContext.Provider>
    );
  }
}

export default withRouter(App);

import React, { Component } from 'react';

import { ContentWrapper } from '../styles';
import auth, { login, logout } from '../api/authApi';
import { getCoins } from '../api/coinApi';
import { addOwned, removeOwned } from '../api/ownedApi';
import coinHelper from '../helpers/coinHelper';

import Loading from './Loading';
import Header from './Header';
import Menu from './Menu';
import CoinList from './CoinList';
import { MainWrapper } from '../styles';
import LoadingContext from '../context/loadingContext';

class App extends Component {
  constructor() {
    super();

    this.defaultState = {
      user: null,
      isLoading: false,
      menuOpen: false,
      coins: [],
      filteredCoins: [],
      filter: '',
      filters: [],
      denominations: [],
      denomination: ''
    };

    this.state = this.defaultState;
  }

  setDefaultState = () => {
    this.setState(this.defaultState);
  };

  showLoader = () => {
    this.setState({ isLoading: true });
  };

  hideLoader = () => {
    this.setState({ isLoading: false });
  };

  async componentDidMount() {
    auth.onAuthStateChanged(async user => {
      this.showLoader();

      if (user) {
        const coins = await getCoins(user.uid);
        const denominations = coinHelper.getDenominations(coins);
        const [denomination] = denominations;
        const filters = ['All', 'Needed', 'Owned'];
        const [filter] = filters;

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

  componentDidUpdate() {
    const { filter, coins, filteredCoins, denomination } = this.state;
    const newFilteredCoins = coinHelper.filterCoins(
      filter,
      coins,
      denomination
    );
    const filterChanged =
      JSON.stringify(newFilteredCoins) !== JSON.stringify(filteredCoins);

    if (filterChanged) {
      this.setState({ filteredCoins: newFilteredCoins });
    }
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

  handleAuth = e => {
    e.preventDefault();
  };

  handleMenuToggle = () => {
    console.log('hi');
    this.setState(prevState => ({
      menuOpen: !prevState.menuOpen
    }));
  };

  handleFilterChange = e => {
    this.setState({ filter: e.target.value });
  };

  handleDenominationChange = e => {
    this.setState({ denomination: e.target.value });
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

  render() {
    const {
      user,
      isLoading,
      menuOpen,
      coins,
      filteredCoins,
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
            logout={this.logout}
            handleAuth={this.handleAuth}
            filters={filters}
            filter={filter}
            handleFilterChange={this.handleFilterChange}
            denominations={denominations}
            denomination={denomination}
            handleDenominationChange={this.handleDenominationChange}
          />
        )}

        <MainWrapper menuOpen={menuOpen}>
          <Header
            title="Coinsly"
            user={user}
            login={this.login}
            handleMenuToggle={this.handleMenuToggle}
            coins={coins}
            denominations={denominations}
            denomination={denomination}
            handleDenominationChange={this.handleDenominationChange}
          />

          <ContentWrapper>
            {user && (
              <CoinList
                coins={filteredCoins}
                handleOwnedChange={this.handleOwnedChange}
              />
            )}
          </ContentWrapper>
        </MainWrapper>
      </LoadingContext.Provider>
    );
  }
}

export default App;

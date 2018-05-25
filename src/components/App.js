import React, { Component, Fragment } from 'react';

import { ContentWrapper } from '../styles';
import auth, { login, logout } from '../api/authApi';
import { getCoins } from '../api/coinApi';
import { addOwned, removeOwned } from '../api/ownedApi';
import coinHelper from '../helpers/coinHelper';

import Loading from './Loading';
import Header from './Header';
import Menu from './Menu';
import Denominations from './Denominations';
import Totals from './Totals';
import CoinList from './CoinList';
import { MainWrapper, TotalsWrapper } from '../styles';
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

        <Menu
          menuOpen={menuOpen}
          filters={filters}
          filter={filter}
          handleChange={this.handleFilterChange}
        />

        <MainWrapper menuOpen={menuOpen}>
          <Header
            title="Coinsly"
            user={user}
            login={this.login}
            logout={this.logout}
            handleAuth={this.handleAuth}
            handleMenuToggle={this.handleMenuToggle}
          >
            {user && (
              <Fragment>
                <Denominations
                  denominations={denominations}
                  denomination={denomination}
                  handleChange={this.handleDenominationChange}
                />

                <TotalsWrapper>
                  <Totals coins={coins}>
                    {({ total, owned, percentage }) => (
                      <p>
                        Total {owned} of {total} ({percentage}%)
                      </p>
                    )}
                  </Totals>

                  <Totals
                    coins={coinHelper.filterByDenomination(coins, denomination)}
                  >
                    {({ total, owned, percentage }) => (
                      <p>
                        {denomination} Total {owned} of {total} ({percentage}%)
                      </p>
                    )}
                  </Totals>
                </TotalsWrapper>
              </Fragment>
            )}
          </Header>

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

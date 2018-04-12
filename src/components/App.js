import React, { Component } from 'react';
import auth, { logIn, logOut } from '../services/authService';
import { getCoins } from '../services/coinService';
import { updateUser } from '../services/userService';
import { addOwned, removeOwned, getOwned } from '../services/ownedService';
import Header from './Header';
import Filters from './Filters';
import CoinList from './CoinList';

class App extends Component {
  constructor() {
    super();

    this.defaultState = {
      user: null,
      isLoading: false,
      coins: [],
      owned: [],
      filter: 'all'
    };

    this.state = this.defaultState;
  }

  setDefaultState = () => {
    this.setState(this.defaultState);
  };

  showLoader = () => {
    this.setState({
      isLoading: true
    });
  };

  hideLoader = () => {
    this.setState({
      isLoading: false
    });
  };

  async componentDidMount() {
    auth.onAuthStateChanged(async user => {
      this.showLoader();

      if (user) {
        const coins = await getCoins();
        const owned = await getOwned(user.uid);

        this.setState({
          user,
          coins,
          owned
        });
      }

      this.hideLoader();
    });
  }

  login = async () => {
    this.showLoader();

    const user = await logIn();

    if (user) {
      await updateUser(user);

      this.setState({
        user
      });
    }

    this.hideLoader();
  };

  logout = async () => {
    this.showLoader();
    await logOut();
    this.setDefaultState();
  };

  handleAuth = e => {
    e.preventDefault();

    console.log(this.state.user);
  };

  handleFilterChange = e => {
    const { value } = e.target;

    this.setState({
      filter: value
    });
  };

  handleFilterSubmit = e => {
    e.preventDefault();

    const { value } = e.target.filter;

    this.setState({
      filter: value
    });
  };

  handleOwnedChange = async e => {
    this.showLoader();

    const { checked, value: coinId } = e.target;
    const { owned, user } = this.state;

    let newState;

    if (checked) {
      const ownedId = await addOwned(user.uid, coinId);
      newState = [...owned, { id: ownedId, userId: user.uid, coinId }];
    } else {
      await removeOwned(user.uid, coinId);
      newState = owned.filter(o => o.coinId !== coinId);
    }

    this.setState({
      owned: newState
    });

    this.hideLoader();
  };

  handleCoinSubmit = e => {
    e.preventDefault();

    // console.log(this.state.owned.map(o => o.id));
  };

  render() {
    const { user, isLoading, filter } = this.state;

    return (
      <div>
        <Header title="Coinsly" />

        <form onSubmit={this.handleAuth}>
          {user ? (
            <button onClick={this.logout}>Log out</button>
          ) : (
            <button onClick={this.login}>Log In</button>
          )}
        </form>

        {isLoading ? <p>Loading</p> : null}

        {user ? (
          <div>
            <Filters
              handleSubmit={this.handleFilterSubmit}
              handleChange={this.handleFilterChange}
              filter={filter}
            />

            <CoinList
              handleSubmit={this.handleCoinSubmit}
              handleOwnedChange={this.handleOwnedChange}
              {...this.state}
            />
          </div>
        ) : null}
      </div>
    );
  }
}

export default App;

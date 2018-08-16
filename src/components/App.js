import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import LoadingContainer from '../containers/LoadingContainer';
import HeaderContainer from '../containers/HeaderContainer';
import DetailsContainer from '../containers/DetailsContainer';
import MenuContainer from '../containers/MenuContainer';
import CoinListContainer from '../containers/CoinListContainer';

import '../styles/global.scss';

class App extends Component {
  componentDidMount() {
    this.props.onAuthChanged();
  }

  render() {
    return (
      <Fragment>
        <LoadingContainer />
        <MenuContainer />
        <HeaderContainer />
        <DetailsContainer />
        <CoinListContainer />
      </Fragment>
    );
  }
}

App.propTypes = {
  onAuthChanged: PropTypes.func.isRequired,
  setInitialState: PropTypes.func.isRequired
};

export default App;

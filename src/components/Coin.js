import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from '../styles/Coin.module.scss';
import tick from '../assets/tick.svg';

class Coin extends Component {
  state = {
    loaded: false
  };

  onImageLoaded = () => {
    this.setState({ loaded: true });
  }

  render () {
    const { coin, setOwnedValue } = this.props;

    return (
      <li className={`${styles.coin} ${coin.owned ? styles.coin__owned : ''} ${this.state.loaded ? styles.coin__loaded : 'not-loaded'}`}>
        <label className={styles.label} data-testid="coin-label">
          {coin.owned && <img className={styles.tick} src={tick} alt="" />}

          <img
            className={styles.image}
            src={coin.imageUrl}
            alt=""
            onLoad={this.onImageLoaded} />

          <input
            className={styles.input}
            type="checkbox"
            checked={coin.owned}
            onChange={setOwnedValue}
            value={coin.id}
          />
        </label>
      </li>
    )
  }
}

Coin.propTypes = {
  coin: PropTypes.object.isRequired,
  setOwnedValue: PropTypes.func.isRequired
};

export default Coin;

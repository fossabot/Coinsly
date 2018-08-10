import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { getImage } from '../api/storageApi';
import { TickImage, CoinImg, CoinLabel, CoinListItem } from '../styles';
import coinIcon from '../assets/coin.svg';
import tick from '../assets/tick.svg';

class Coin extends Component {
  state = {
    imageUrl: coinIcon
  }

  async componentDidMount() {
    const { coin } = this.props;
    const imageUrl = await getImage(`${coin.denomination}/${coin.imageUrl}`);
    this.setState({ imageUrl });
  }

  render () {
    const { coin, handleOwnedChange } = this.props;

    return (
      <CoinListItem owned={coin.owned}>
        <CoinLabel data-testid="coin-label">
          {coin.owned && <TickImage src={tick} alt="" />}

          <CoinImg src={this.state.imageUrl} alt="" owned={coin.owned} />

          <h3 data-testid="coin-label">{coin.name}</h3>

          <input
            type="checkbox"
            checked={coin.owned}
            onChange={handleOwnedChange}
            value={coin.id}
            style={{ display: 'none' }}
          />
        </CoinLabel>
      </CoinListItem>
    );
  }
}

Coin.propTypes = {
  coin: PropTypes.object.isRequired,
  handleOwnedChange: PropTypes.func.isRequired
};

export default Coin;

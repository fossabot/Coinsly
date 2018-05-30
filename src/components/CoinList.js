import React from 'react';
import PropTypes from 'prop-types';
import { Fieldset } from 'glamorous';

import { CoinListWrapper } from '../styles';
import LoadingContext from '../context/loadingContext';

import Coin from './Coin';

const CoinList = ({ coins, handleOwnedChange }) =>
  coins.length > 0 ? (
    <LoadingContext.Consumer>
      {isLoading => (
        <Fieldset border="none" padding={0} disabled={isLoading}>
          <CoinListWrapper>
            {coins.map(coin => (
              <Coin
                key={coin.id}
                coin={coin}
                handleOwnedChange={handleOwnedChange}
              />
            ))}
          </CoinListWrapper>
        </Fieldset>
      )}
    </LoadingContext.Consumer>
  ) : (
    <p>No coins found</p>
  );

CoinList.propTypes = {
  coins: PropTypes.array,
  handleOwnedChange: PropTypes.func.isRequired
};

export default CoinList;

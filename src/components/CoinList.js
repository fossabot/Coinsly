import React from 'react';
import PropTypes from 'prop-types';
import { Fieldset } from 'glamorous';

import { CoinListWrapper } from '../styles';
import LoadingContext from '../context/loadingContext';

import Coin from './Coin';

const CoinList = ({ coins }) =>
  coins.length > 0 ? (
    <LoadingContext.Consumer>
      {isLoading => (
        <form>
          <Fieldset border="none" padding={0} disabled={isLoading}>
            <CoinListWrapper>
              {coins.map(coin => <Coin key={coin.id} coin={coin} />)}
            </CoinListWrapper>
          </Fieldset>
        </form>
      )}
    </LoadingContext.Consumer>
  ) : (
    <p>No coins found</p>
  );

CoinList.propTypes = {
  coins: PropTypes.array
};

CoinList.defaultProps = {
  coins: []
};

export default CoinList;

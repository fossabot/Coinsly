import React from 'react';
import PropTypes from 'prop-types';

import coinHelper from '../helpers/coinHelper';

import Totals from './Totals';
import { TotalsWrapper, TotalsText } from '../styles';

const Details = ({ user, coins, denomination }) =>
  user && (
    <TotalsWrapper>
      <Totals coins={coins}>
        {({ total, owned, percentage }) => (
          <TotalsText>
            <strong>Total coins</strong>: {owned} of {total} ({percentage}%)
          </TotalsText>
        )}
      </Totals>

      <Totals coins={coinHelper.filterByDenomination(coins, denomination)}>
        {({ total, owned, percentage }) => (
          <TotalsText>
            <strong>{denomination}</strong>: {owned} of {total} ({percentage}%)
          </TotalsText>
        )}
      </Totals>
    </TotalsWrapper>
  );

Details.propTypes = {
  user: PropTypes.object,
  coins: PropTypes.array.isRequired,
  denomination: PropTypes.string.isRequired
};

export default Details;

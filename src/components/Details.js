import React from 'react';
import PropTypes from 'prop-types';

import coinHelper from '../helpers/coinHelper';
import Totals from './Totals';
import styles from '../styles/Totals.module.scss';

const Details = ({ user, coins, denomination }) =>
  user && (
    <div className={styles.totals}>
      <Totals coins={coins}>
        {({ total, owned, percentage }) => (
          <p className={styles.text}>
            <strong>Total coins</strong>: {owned} of {total} ({percentage}%)
          </p>
        )}
      </Totals>

      <Totals coins={coinHelper.filterByDenomination(coins, denomination)}>
        {({ total, owned, percentage }) => (
          <p className={styles.text}>
            <strong>{denomination}</strong>: {owned} of {total} ({percentage}%)
          </p>
        )}
      </Totals>
    </div>
  );

Details.propTypes = {
  user: PropTypes.object,
  coins: PropTypes.array.isRequired,
  denomination: PropTypes.string.isRequired
};

export default Details;

import React from 'react';
import PropTypes from 'prop-types';

import styles from '../styles/Filters.module.scss';

const Denominations = ({ denominations, denomination, updateDenomination }) => (
  <div className={styles.filter}>
    {denominations.map(name => (
      <label
        key={name}
        className={`${styles.label} ${
          denomination === name ? styles.label__selected : ''
        }`}
      >
        {name}

        <input
          type="radio"
          name="denomination"
          value={name}
          checked={denomination === name}
          onChange={updateDenomination}
          style={{ display: 'none' }}
        />
      </label>
    ))}
  </div>
);

Denominations.propTypes = {
  denominations: PropTypes.array.isRequired,
  denomination: PropTypes.string.isRequired,
  updateDenomination: PropTypes.func.isRequired
};

export default Denominations;

import React from 'react';
import PropTypes from 'prop-types';

import filterStyles from '../styles/Filters.module.scss';

const Denominations = ({ denominations, denomination, handleChange }) => (
  <div className={filterStyles.filter}>
    {denominations.map(name => (
      <label
        key={name}
        className={`${filterStyles.label} ${denomination === name ? filterStyles.label__selected : ''}`}>
        {name}

        <input
          type="radio"
          name="denomination"
          value={name}
          checked={denomination === name}
          onChange={handleChange}
          style={{ display: 'none' }}
        />
      </label>
    ))}
  </div>
);

Denominations.propTypes = {
  denominations: PropTypes.array.isRequired,
  denomination: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired
};

export default Denominations;

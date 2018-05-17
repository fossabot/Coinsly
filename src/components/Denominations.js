import React from 'react';
import PropTypes from 'prop-types';

import { FilterLabel } from '../styles';

const Denominations = ({ denominations, denomination, handleChange }) => (
  <form>
    {denominations.map(name => (
      <FilterLabel key={name} selected={denomination === name}>
        {name}
        <input
          type="radio"
          name="denomination"
          value={name}
          checked={denomination === name}
          onChange={handleChange}
          style={{ display: 'none' }}
        />
      </FilterLabel>
    ))}
  </form>
);

Denominations.propTypes = {
  denominations: PropTypes.array.isRequired,
  denomination: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired
};

export default Denominations;

import React from 'react';
import PropTypes from 'prop-types';

import { FilterWrapper, FilterLabel } from '../styles';

const Denominations = ({ denominations, denomination, handleChange }) => (
  <FilterWrapper>
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
  </FilterWrapper>
);

Denominations.propTypes = {
  denominations: PropTypes.array.isRequired,
  denomination: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired
};

export default Denominations;

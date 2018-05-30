import React from 'react';
import PropTypes from 'prop-types';

import { FilterWrapper, FilterLabel } from '../styles';

const Filters = ({ filters, filter, handleChange }) => (
  <FilterWrapper>
    {filters.map(filterName => (
      <FilterLabel key={filterName} selected={filter === filterName}>
        {filterName}

        <input
          type="radio"
          name="filter"
          value={filterName}
          checked={filter === filterName}
          onChange={handleChange}
          style={{ display: 'none' }}
        />
      </FilterLabel>
    ))}
  </FilterWrapper>
);

Filters.propTypes = {
  filters: PropTypes.array.isRequired,
  filter: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired
};

export default Filters;

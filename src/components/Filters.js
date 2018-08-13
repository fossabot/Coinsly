import React from 'react';
import PropTypes from 'prop-types';

import filterStyles from '../styles/Filters.module.scss';

const Filters = ({ filters, filter, handleChange }) => (
  <div className={filterStyles.filter}>
    {filters.map(name => (
      <label
        key={name}
        className={`${filterStyles.label} ${filter === name ? filterStyles.label__selected : ''}`}>
        {name}

        <input
          type="radio"
          name="filter"
          value={name}
          checked={filter === name}
          onChange={handleChange}
          style={{ display: 'none' }}
        />
      </label>
    ))}
  </div>
);

Filters.propTypes = {
  filters: PropTypes.array.isRequired,
  filter: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired
};

export default Filters;

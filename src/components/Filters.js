import React from 'react';
import PropTypes from 'prop-types';

const Filters = ({ filters, filter, handleChange }) => (
  <form>
    {filters.map(filterName => (
      <label key={filterName}>
        {filterName}
        <input
          type="radio"
          name="filter"
          value={filterName}
          checked={filter === filterName}
          onChange={handleChange}
        />
      </label>
    ))}
  </form>
);

Filters.propTypes = {
  filters: PropTypes.array.isRequired,
  filter: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired
};

Filters.defaultProps = {
  filters: []
};

export default Filters;

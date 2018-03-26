import React from 'react';
import PropTypes from 'prop-types';

const Filters = ({ handleSubmit, handleCheckboxChange, filter }) => (
  <form onSubmit={handleSubmit}>
    <label>
      All
      <input
        type="radio"
        name="filter"
        value="all"
        checked={filter === 'all'}
        onChange={handleCheckboxChange}
      />
    </label>

    <label>
      Only needed
      <input
        type="radio"
        name="filter"
        value="onlyNeeded"
        checked={filter === 'onlyNeeded'}
        onChange={handleCheckboxChange}
      />
    </label>

    <label>
      Only owned
      <input
        type="radio"
        name="filter"
        value="onlyOwned"
        checked={filter === 'onlyOwned'}
        onChange={handleCheckboxChange}
      />
    </label>

    <button type="submit">Filter</button>
  </form>
);

Filters.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleCheckboxChange: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired
};

export default Filters;

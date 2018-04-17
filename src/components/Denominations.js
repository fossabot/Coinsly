import React from 'react';
import PropTypes from 'prop-types';

const Denominations = ({ denominations, denomination, handleChange }) => (
  <form>
    {denominations.map(name => (
      <label key={name}>
        {name}
        <input
          type="radio"
          name="denomination"
          value={name}
          checked={denomination === name}
          onChange={handleChange}
        />
      </label>
    ))}
  </form>
);

Denominations.propTypes = {
  denominations: PropTypes.array.isRequired,
  denomination: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired
};

export default Denominations;

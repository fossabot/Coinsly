import React from 'react';
import PropTypes from 'prop-types';

import styles from '../styles/Filters.module.scss';

const Statuses = ({ statuses, status, updateStatus }) => (
  <div className={styles.filter}>
    {statuses.map(name => (
      <label
        key={name}
        className={`${styles.label} ${
          status === name ? styles.label__selected : ''
        }`}
      >
        {name}

        <input
          type="radio"
          name="filter"
          value={name}
          checked={status === name}
          onChange={updateStatus}
          style={{ display: 'none' }}
        />
      </label>
    ))}
  </div>
);

Statuses.propTypes = {
  statuses: PropTypes.array.isRequired,
  status: PropTypes.string.isRequired,
  updateStatus: PropTypes.func.isRequired
};

export default Statuses;

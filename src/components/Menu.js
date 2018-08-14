import React from 'react';
import PropTypes from 'prop-types';

import Filters from './Filters';
import Denominations from './Denominations';
import styles from '../styles/Menu.module.scss';

const Menu = ({
  menuOpen,
  filters,
  filter,
  handleFilterChange,
  denominations,
  denomination,
  handleDenominationChange
}) => (
  <ul className={`${styles.menu} ${menuOpen ? styles.menu__open : ''}`}>
    <li className={styles.menu_item}>
      <h3 className={styles.menu_heading}>Filters</h3>

      <Filters
        filters={filters}
        filter={filter}
        handleChange={handleFilterChange}
      />
    </li>

    <li className={styles.menu_item}>
      <h3 className={styles.menu_heading}>Coin Type</h3>

      <Denominations
        denominations={denominations}
        denomination={denomination}
        handleChange={handleDenominationChange}
      />
    </li>
  </ul>
);

Menu.propTypes = {
  menuOpen: PropTypes.bool.isRequired,
  filters: PropTypes.array.isRequired,
  filter: PropTypes.string.isRequired,
  handleFilterChange: PropTypes.func.isRequired,
  denominations: PropTypes.array.isRequired,
  denomination: PropTypes.string.isRequired,
  handleDenominationChange: PropTypes.func.isRequired
};

export default Menu;

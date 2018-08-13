import React from 'react';
import PropTypes from 'prop-types';

import Filters from './Filters';
import Denominations from './Denominations';
import menuStyles from '../styles/Menu.module.scss';

const Menu = ({
  menuOpen,
  filters,
  filter,
  handleFilterChange,
  denominations,
  denomination,
  handleDenominationChange
}) => (
  <ul className={`${menuStyles.menu} ${menuOpen ? menuStyles.menu__open : ''}`}>
    <li className={menuStyles.menu_item}>
      <h3 className={menuStyles.menu_heading}>Filters</h3>

      <Filters
        filters={filters}
        filter={filter}
        handleChange={handleFilterChange}
      />
    </li>

    <li className={menuStyles.menu_item}>
      <h3 className={menuStyles.menu_heading}>Coin Type</h3>

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

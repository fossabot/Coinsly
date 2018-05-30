import React from 'react';
import PropTypes from 'prop-types';

import Filters from './Filters';
import Denominations from './Denominations';

import { MenuWrapper, MenuItem, MenuHeading } from '../styles';

const Menu = ({
  menuOpen,
  user,
  filters,
  filter,
  handleFilterChange,
  denominations,
  denomination,
  handleDenominationChange
}) => (
  <MenuWrapper menuOpen={menuOpen}>
    <MenuItem>
      <MenuHeading>Filters</MenuHeading>

      <Filters
        filters={filters}
        filter={filter}
        handleChange={handleFilterChange}
      />
    </MenuItem>

    <MenuItem>
      <MenuHeading>Coin Type</MenuHeading>

      <Denominations
        denominations={denominations}
        denomination={denomination}
        handleChange={handleDenominationChange}
      />
    </MenuItem>
  </MenuWrapper>
);

Menu.propTypes = {
  menuOpen: PropTypes.bool.isRequired,
  user: PropTypes.object,
  filters: PropTypes.array.isRequired,
  filter: PropTypes.string.isRequired,
  handleFilterChange: PropTypes.func.isRequired,
  denominations: PropTypes.array.isRequired,
  denomination: PropTypes.string.isRequired,
  handleDenominationChange: PropTypes.func.isRequired
};

export default Menu;

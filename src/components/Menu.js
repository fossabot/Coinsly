import React from 'react';
import PropTypes from 'prop-types';

import Filters from './Filters';

import { MenuWrapper } from '../styles';

const Menu = ({ menuOpen, filters, filter, handleFilterChange }) => (
  <MenuWrapper menuOpen={menuOpen}>
    <li>
      <Filters
        filters={filters}
        filter={filter}
        handleChange={handleFilterChange}
      />
    </li>
  </MenuWrapper>
);

Menu.propTypes = {
  menuOpen: PropTypes.bool.isRequired
};

export default Menu;

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Img, Form } from 'glamorous';

import Filters from './Filters';
import Denominations from './Denominations';

import { MenuWrapper, MenuItem, LightButton } from '../styles';

const Menu = ({
  menuOpen,
  user,
  login,
  logout,
  handleAuth,
  filters,
  filter,
  handleFilterChange,
  denominations,
  denomination,
  handleDenominationChange
}) => (
  <MenuWrapper menuOpen={menuOpen}>
    <MenuItem>
      <Form onSubmit={handleAuth} display="flex" alignItems="center">
        {user && (
          <Fragment>
            <Img
              width={50}
              src={user.photoURL}
              alt={user.email}
              borderRadius="50%"
            />

            <p>{user.displayName}</p>

            <LightButton type="submit" onClick={logout}>
              Log out
            </LightButton>
          </Fragment>
        )}
      </Form>
    </MenuItem>

    <MenuItem>
      <h2>Filters</h2>

      <Filters
        filters={filters}
        filter={filter}
        handleChange={handleFilterChange}
      />
    </MenuItem>

    <MenuItem>
      <h2>Coin Type</h2>

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
  handleAuth: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  filters: PropTypes.array.isRequired,
  filter: PropTypes.string.isRequired,
  handleFilterChange: PropTypes.func.isRequired,
  denominations: PropTypes.array.isRequired,
  denomination: PropTypes.string.isRequired,
  handleDenominationChange: PropTypes.func.isRequired
};

export default Menu;

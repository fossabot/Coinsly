import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import {
  HeaderWrapper,
  SiteTitle,
  UserWrapper,
  UserAvatar,
  MenuButton,
  LoginButton,
  LogoutButton
} from '../styles';

const Header = ({ title, user, login, logout, handleMenuToggle }) => (
  <HeaderWrapper>
    {user ? (
      <MenuButton type="button" onClick={handleMenuToggle}>
        Menu
      </MenuButton>
    ) : (
      <LoginButton type="submit" onClick={login}>
        Log In
      </LoginButton>
    )}

    <SiteTitle>{title}</SiteTitle>

    <UserWrapper>
      {user && (
        <Fragment>
          <LogoutButton type="submit" onClick={logout}>
            Log out
          </LogoutButton>

          <UserAvatar src={user.photoURL} alt={user.email} />
        </Fragment>
      )}
    </UserWrapper>
  </HeaderWrapper>
);

Header.propTypes = {
  title: PropTypes.string.isRequired,
  user: PropTypes.object,
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  handleMenuToggle: PropTypes.func.isRequired
};

export default Header;

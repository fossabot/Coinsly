import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Img, Form } from 'glamorous';

import {
  HeaderWrapper,
  HeaderDetailsWrapper,
  UserDetailsWrapper
} from '../styles';
import Loading from './Loading';

import logo from '../assets/logo--small.png';

const Header = ({
  title,
  user,
  login,
  logout,
  handleAuth,
  children
}) => (
  <HeaderWrapper>
    <HeaderDetailsWrapper>
      <Img src={logo} alt={title} />

      <Loading />

      <UserDetailsWrapper>
        <Form onSubmit={handleAuth} display="flex" alignItems="center">
          {user ? (
            <Fragment>
              <p>{user.displayName}</p>
              <button type="submit" onClick={logout}>
                Log out
              </button>
              <Img width={50} src={user.photoURL} alt={user.email} borderRadius='50%' />
            </Fragment>
          ) : (
            <button type="submit" onClick={login}>
              Log In
            </button>
          )}
        </Form>
      </UserDetailsWrapper>
    </HeaderDetailsWrapper>

    {children}
  </HeaderWrapper>
);

Header.propTypes = {
  title: PropTypes.string.isRequired,
  user: PropTypes.object,
  handleAuth: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  children: PropTypes.object
};

export default Header;

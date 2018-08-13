import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import headerStyles from '../styles/Header.module.scss';
import buttonStyles from '../styles/buttons.module.scss';

const Header = ({ title, user, login, logout, handleMenuToggle }) => (
  <header className={headerStyles.header}>
    {user ? (
      <button className={buttonStyles.button} type="button" onClick={handleMenuToggle}>
        Menu
      </button>
    ) : (
      <button className={buttonStyles.button} type="submit" onClick={login}>
        Log In
      </button>
    )}

    <h1 className={headerStyles.siteTitle}>{title}</h1>

    <div className={headerStyles.userWrapper}>
      {user && (
        <Fragment>
          <button className={buttonStyles.button} type="submit" onClick={logout}>
            Log out
          </button>

          <img className={headerStyles.userAvatar} src={user.photoURL} alt={user.email} />
        </Fragment>
      )}
    </div>
  </header>
);

Header.propTypes = {
  title: PropTypes.string.isRequired,
  user: PropTypes.object,
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  handleMenuToggle: PropTypes.func.isRequired
};

export default Header;

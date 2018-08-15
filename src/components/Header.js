import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/Header.module.scss';
import buttonStyles from '../styles/buttons.module.scss';

const Header = ({ title, user, login, logout, toggleMenu }) => (
  <header className={styles.header}>
    {user ? (
      <button
        className={buttonStyles.button}
        type="button"
        onClick={toggleMenu}
      >
        Menu
      </button>
    ) : (
      <button className={buttonStyles.button} type="submit" onClick={login}>
        Log In
      </button>
    )}

    <h1 className={styles.siteTitle}>{title}</h1>

    <div className={styles.userWrapper}>
      {user && (
        <Fragment>
          <button
            className={buttonStyles.button}
            type="submit"
            onClick={logout}
          >
            Log out
          </button>

          <img
            className={styles.userAvatar}
            src={user.photoURL}
            alt={user.email}
          />
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
  toggleMenu: PropTypes.func.isRequired
};

export default Header;

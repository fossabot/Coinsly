import React from 'react';
import PropTypes from 'prop-types';

import StatusesContainer from '../containers/StatusesContainer';
import DenominationsContainer from '../containers/DenominationsContainer';
import styles from '../styles/Menu.module.scss';

const Menu = ({ menuOpen }) => (
  <ul className={`${styles.menu} ${menuOpen ? styles.menu__open : ''}`}>
    <li className={styles.menu_item}>
      <h3 className={styles.menu_heading}>Filters</h3>
      <StatusesContainer />
    </li>

    <li className={styles.menu_item}>
      <h3 className={styles.menu_heading}>Coin Type</h3>
      <DenominationsContainer />
    </li>
  </ul>
);

Menu.propTypes = {
  menuOpen: PropTypes.bool.isRequired
};

export default Menu;

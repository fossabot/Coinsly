import React from 'react';
import PropTypes from 'prop-types';

const Header = ({ title }) => <header>{title}</header>;

Header.propTypes = {
  title: PropTypes.string.isRequired
};

export default Header;

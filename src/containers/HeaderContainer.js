import { connect } from 'react-redux';
import Header from '../components/Header';
import { toggleMenu, login, logout } from '../state/actions';

const mapStateToProps = ({ user }) => ({
  userAuthenticated: user.uid !== undefined,
  user
});

const mapDispatchToProps = dispatch => ({
  toggleMenu: () => dispatch(toggleMenu()),
  login: () => dispatch(login()),
  logout: () => dispatch(logout())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);

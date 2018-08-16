import { connect } from 'react-redux';
import Header from '../components/Header';
import { login, logout } from '../store/actions/user';
import { toggleMenu } from '../store/actions/menu';

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

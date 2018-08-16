import { connect } from 'react-redux';
import Header from '../components/Header';
import { toggleMenu } from '../state/actions';

const mapStateToProps = ({ user }) => ({
  userAuthenticated: user.uid !== undefined,
  user
});

const mapDispatchToProps = dispatch => ({
  toggleMenu: () => dispatch(toggleMenu())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);

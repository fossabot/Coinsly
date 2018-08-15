import { connect } from 'react-redux';
import Header from '../components/Header';
import { toggleMenu } from '../state/actions';

const mapDispatchToProps = dispatch => ({
  toggleMenu: () => dispatch(toggleMenu())
});

export default connect(
  undefined,
  mapDispatchToProps
)(Header);

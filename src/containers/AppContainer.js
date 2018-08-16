import { connect } from 'react-redux';
import App from '../components/App';
import { isLoading, setInitialState } from '../state/actions';

const mapStateToProps = ({ loading, menu, user }) => ({
  loading,
  menuOpen: menu.isOpen,
  user
});

const mapDispatchToProps = dispatch => ({
  showLoader: () => dispatch(isLoading(true)),
  hideLoader: () => dispatch(isLoading(false)),
  setInitialState: user => dispatch(setInitialState(user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

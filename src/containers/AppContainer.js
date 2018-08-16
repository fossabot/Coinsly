import { connect } from 'react-redux';
import App from '../components/App';
import { setInitialState } from '../store/actions';
import { onAuthChanged } from '../store/actions/user';

const mapDispatchToProps = dispatch => ({
  onAuthChanged: () => dispatch(onAuthChanged()),
  setInitialState: user => dispatch(setInitialState(user))
});

export default connect(
  undefined,
  mapDispatchToProps
)(App);

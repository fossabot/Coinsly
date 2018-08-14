import { connect } from 'react-redux';
import App from '../components/App';
import { onAuthChanged, setInitialState } from '../state/actions';

const mapDispatchToProps = dispatch => ({
  onAuthChanged: () => dispatch(onAuthChanged()),
  setInitialState: user => dispatch(setInitialState(user))
});

export default connect(
  undefined,
  mapDispatchToProps
)(App);

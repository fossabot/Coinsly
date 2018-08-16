import { connect } from 'react-redux';
import App from '../components/App';
import { setInitialState } from '../state/actions';

const mapDispatchToProps = dispatch => ({
  setInitialState: user => dispatch(setInitialState(user))
});

export default connect(
  undefined,
  mapDispatchToProps
)(App);

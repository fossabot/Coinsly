import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
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
)(withRouter(App));

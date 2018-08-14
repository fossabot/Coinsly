import { connect } from 'react-redux';
import App from '../components/App';
import { isLoading } from '../state/actions';

const mapStateToProps = ({ loading }) => ({
  loading
});

const mapDispatchToProps = (dispatch) => ({
  showLoader: () => dispatch(isLoading(true)),
  hideLoader: () => dispatch(isLoading(false))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

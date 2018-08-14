import { connect } from 'react-redux';
import App from '../components/App';
import { isLoading, setAllFilters } from '../state/actions';

const mapStateToProps = ({ loading, filters }) => ({
  loading,
  statuses: filters.statuses,
  status: filters.status,
  denominations: filters.denominations,
  denomination: filters.denomination
});

const mapDispatchToProps = dispatch => ({
  showLoader: () => dispatch(isLoading(true)),
  hideLoader: () => dispatch(isLoading(false)),
  updateAllFilters: filters => dispatch(setAllFilters(filters))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

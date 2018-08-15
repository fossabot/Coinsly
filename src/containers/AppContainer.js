import { connect } from 'react-redux';
import App from '../components/App';
import {
  isLoading,
  setAllFilters,
  addAllCoins,
  setFilteredCoins,
  setUserDetails
} from '../state/actions';

const mapStateToProps = ({ loading, menu, filters, coins, user }) => ({
  loading,
  menuOpen: menu.isOpen,
  statuses: filters.statuses,
  status: filters.status,
  denominations: filters.denominations,
  denomination: filters.denomination,
  coins: coins.allCoins,
  filteredCoins: coins.filteredCoins,
  user
});

const mapDispatchToProps = dispatch => ({
  showLoader: () => dispatch(isLoading(true)),
  hideLoader: () => dispatch(isLoading(false)),
  setAllFilters: filters => dispatch(setAllFilters(filters)),
  addAllCoins: coins => dispatch(addAllCoins(coins)),
  setFilteredCoins: coins => dispatch(setFilteredCoins(coins)),
  setUserDetails: coins => dispatch(setUserDetails(coins))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

import { connect } from 'react-redux';
import App from '../components/App';
import {
  isLoading,
  setAllFilters,
  addAllCoins,
  setFilteredCoins,
  filterCoins,
  setUserDetails,
  addOwnedCoin
} from '../state/actions';

const mapStateToProps = ({ loading, menu, coins, user }) => ({
  loading,
  menuOpen: menu.isOpen,
  statuses: coins.statuses,
  status: coins.status,
  denominations: coins.denominations,
  denomination: coins.denomination,
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
  filterCoins: () => dispatch(filterCoins()),
  setUserDetails: coins => dispatch(setUserDetails(coins)),
  addOwnedCoin: (coinId, ownerId) => dispatch(addOwnedCoin(coinId, ownerId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

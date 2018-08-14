import { connect } from 'react-redux';
import CoinList from '../components/CoinList';

const mapStateToProps = ({ loading, menu, coins, user }) => ({
  loading,
  menuOpen: menu.isOpen,
  coins: coins.filteredCoins,
  userAuthenticated: user.uid !== undefined
});

export default connect(mapStateToProps)(CoinList);

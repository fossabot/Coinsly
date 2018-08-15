import { connect } from 'react-redux';
import CoinList from '../components/CoinList';

const mapStateToProps = ({ loading, coins }) => ({
  loading,
  coins: coins.filteredCoins
});

export default connect(mapStateToProps)(CoinList);

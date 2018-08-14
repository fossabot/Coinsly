import { connect } from 'react-redux';
import CoinList from '../components/CoinList';

const mapStateToProps = ({ loading }) => ({
  loading
});

export default connect(mapStateToProps)(CoinList);

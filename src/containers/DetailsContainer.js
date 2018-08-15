import { connect } from 'react-redux';
import Details from '../components/Details';

const mapStateToProps = ({ coins, user }) => ({
  denomination: coins.denomination,
  coins: coins.allCoins,
  user
});

export default connect(mapStateToProps)(Details);

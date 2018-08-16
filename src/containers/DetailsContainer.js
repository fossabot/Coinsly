import { connect } from 'react-redux';
import Details from '../components/Details';

const mapStateToProps = ({ coins, user }) => ({
  user,
  denomination: coins.denomination,
  coins: coins.allCoins
});

export default connect(mapStateToProps)(Details);

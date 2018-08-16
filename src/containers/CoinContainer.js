import { connect } from 'react-redux';
import Coin from '../components/Coin';
import { setOwnedValue } from '../store/actions/coins';

const mapDispatchToProps = dispatch => ({
  setOwnedValue: e => dispatch(setOwnedValue(e))
});

export default connect(
  undefined,
  mapDispatchToProps
)(Coin);

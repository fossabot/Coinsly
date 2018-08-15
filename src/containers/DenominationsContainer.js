import { connect } from 'react-redux';
import Denominations from '../components/Denominations';
import { setDenomination } from '../state/actions';

const mapStateToProps = ({ coins }) => ({
  denominations: coins.denominations,
  denomination: coins.denomination
});

const mapDispatchToProps = dispatch => ({
  updateDenomination: denomination => dispatch(setDenomination(denomination))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Denominations);

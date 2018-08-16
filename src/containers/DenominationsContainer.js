import { connect } from 'react-redux';
import Denominations from '../components/Denominations';
import { updateDenomination } from '../store/actions/filters';

const mapStateToProps = ({ coins }) => ({
  denominations: coins.denominations,
  denomination: coins.denomination
});

const mapDispatchToProps = dispatch => ({
  updateDenomination: denomination => dispatch(updateDenomination(denomination))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Denominations);

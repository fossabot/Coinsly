import { connect } from 'react-redux';
import Menu from '../components/Menu';
// import { setStatus, setDenomination } from '../state/actions';

const mapDispatchToProps = dispatch => ({
  // updateStatus: status => dispatch(setStatus(status)),
  // updateDenomination: denomination => dispatch(setDenomination(denomination))
});

export default connect(
  undefined,
  mapDispatchToProps
)(Menu);

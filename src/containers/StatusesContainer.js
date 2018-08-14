import { connect } from 'react-redux';
import Statuses from '../components/Statuses';
import { setStatus } from '../state/actions';

const mapStateToProps = ({ coins }) => ({
  statuses: coins.statuses,
  status: coins.status
});

const mapDispatchToProps = dispatch => ({
  updateStatus: status => dispatch(setStatus(status))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Statuses);

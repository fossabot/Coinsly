import { connect } from 'react-redux';
import Statuses from '../components/Statuses';
import { updateStatus } from '../store/actions/filters';

const mapStateToProps = ({ coins }) => ({
  statuses: coins.statuses,
  status: coins.status
});

const mapDispatchToProps = dispatch => ({
  updateStatus: status => dispatch(updateStatus(status))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Statuses);

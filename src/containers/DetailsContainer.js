import { connect } from 'react-redux';
import Details from '../components/Details';

const mapStateToProps = ({ filters }) => ({
  denomination: filters.denomination
});

export default connect(mapStateToProps)(Details);

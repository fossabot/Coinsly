import { connect } from 'react-redux';
import Menu from '../components/Menu';

const mapStateToProps = ({ menu }) => ({
  isOpen: menu.isOpen
});

export default connect(mapStateToProps)(Menu);

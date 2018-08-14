import { connect } from 'react-redux';
import Menu from '../components/Menu';

const mapStateToProps = ({ menu, user }) => ({
  isOpen: menu.isOpen,
  showMenu: user.uid !== undefined
});

export default connect(mapStateToProps)(Menu);

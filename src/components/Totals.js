import { Component } from 'react';
import PropTypes from 'prop-types';

const getNewState = (props, state) => {
  const { coins } = props;
  const { owned, percentage } = getTotals(coins);
  const hasChanged = state.total !== coins.length || state.owned !== owned;

  return hasChanged ? { total: coins.length, owned, percentage } : null;
};

const getTotals = coins => {
  const owned = coins.filter(coin => coin.ownedId !== undefined);
  const percentage = owned.length / coins.length * 100;

  return {
    total: coins.length,
    owned: owned.length,
    percentage: isNaN(percentage) ? 0 : percentage.toFixed(0)
  };
};

class Totals extends Component {
  state = {
    owned: 0,
    percentage: 0
  };

  componentDidMount() {
    const { coins } = this.props;
    const { owned, percentage } = getTotals(coins);

    this.setState({ total: coins.length, owned, percentage });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return getNewState(nextProps, prevState);
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { total, owned } = this.state;
    return nextState.total !== total || nextState.owned !== owned;
  }

  render() {
    return this.props.children(this.state);
  }
}

Totals.propTypes = {
  coins: PropTypes.array.isRequired,
  children: PropTypes.func.isRequired
};

export default Totals;

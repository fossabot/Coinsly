import React from 'react';
import PropTypes from 'prop-types';

import coinHelper from '../helpers/coinHelper';

import Totals from './Totals';
import {
  HeaderWrapper,
  SiteTitle,
  TotalsWrapper,
  TotalsText,
  TopLeftButton
} from '../styles';

const Header = ({
  title,
  user,
  login,
  handleMenuToggle,
  coins,
  denominations,
  denomination,
  handleDenominationChange
}) => (
  <HeaderWrapper>
    <SiteTitle>{title}</SiteTitle>

    {user ? (
      <TopLeftButton type="button" onClick={handleMenuToggle}>
        Menu
      </TopLeftButton>
    ) : (
      <TopLeftButton type="submit" onClick={login}>
        Log In
      </TopLeftButton>
    )}

    {user && (
      <TotalsWrapper>
        <Totals coins={coins}>
          {({ total, owned, percentage }) => (
            <TotalsText>
              <strong>Total coins</strong>: {owned} of {total} ({percentage}%)
            </TotalsText>
          )}
        </Totals>

        <Totals coins={coinHelper.filterByDenomination(coins, denomination)}>
          {({ total, owned, percentage }) => (
            <TotalsText>
              <strong>{denomination}</strong>: {owned} of {total} ({percentage}%)
            </TotalsText>
          )}
        </Totals>
      </TotalsWrapper>
    )}
  </HeaderWrapper>
);

Header.propTypes = {
  title: PropTypes.string.isRequired,
  user: PropTypes.object,
  login: PropTypes.func.isRequired,
  handleMenuToggle: PropTypes.func.isRequired,
  coins: PropTypes.array.isRequired,
  denominations: PropTypes.array.isRequired,
  denomination: PropTypes.string.isRequired,
  handleDenominationChange: PropTypes.func.isRequired
};

export default Header;

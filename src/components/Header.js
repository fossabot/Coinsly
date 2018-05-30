import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import coinHelper from '../helpers/coinHelper';

import Totals from './Totals';
import {
  HeaderWrapper,
  SiteTitle,
  UserWrapper,
  UserAvatar,
  TotalsWrapper,
  TotalsText,
  MenuButton,
  LoginButton,
  LogoutButton
} from '../styles';

const Header = ({
  title,
  user,
  login,
  logout,
  handleMenuToggle,
  coins,
  denominations,
  denomination,
  handleDenominationChange
}) => (
  <HeaderWrapper>
    <SiteTitle>{title}</SiteTitle>

    {user ? (
      <MenuButton type="button" onClick={handleMenuToggle}>
        Menu
      </MenuButton>
    ) : (
      <LoginButton type="submit" onClick={login}>
        Log In
      </LoginButton>
    )}

    {user && (
      <Fragment>
        <UserWrapper>
          <LogoutButton type="submit" onClick={logout}>
            Log out
          </LogoutButton>

          <UserAvatar src={user.photoURL} alt={user.email} />
        </UserWrapper>

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
                <strong>{denomination}</strong>: {owned} of {total} ({
                  percentage
                }%)
              </TotalsText>
            )}
          </Totals>
        </TotalsWrapper>
      </Fragment>
    )}
  </HeaderWrapper>
);

Header.propTypes = {
  title: PropTypes.string.isRequired,
  user: PropTypes.object,
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  handleMenuToggle: PropTypes.func.isRequired,
  coins: PropTypes.array.isRequired,
  denominations: PropTypes.array.isRequired,
  denomination: PropTypes.string.isRequired,
  handleDenominationChange: PropTypes.func.isRequired
};

export default Header;

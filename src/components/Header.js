import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import coinHelper from '../helpers/coinHelper';

import Totals from './Totals';
import { HeaderWrapper, SiteTitle, TotalsWrapper } from '../styles';

const Header = ({
  title,
  user,
  coins,
  denominations,
  denomination,
  handleDenominationChange
}) => (
  <HeaderWrapper>
    <SiteTitle>{title}</SiteTitle>

    {user && (
      <Fragment>
        <TotalsWrapper>
          <Totals coins={coins}>
            {({ total, owned, percentage }) => (
              <p>
                Total {owned} of {total} ({percentage}%)
              </p>
            )}
          </Totals>

          <Totals coins={coinHelper.filterByDenomination(coins, denomination)}>
            {({ total, owned, percentage }) => (
              <p>
                {denomination} Total {owned} of {total} ({percentage}%)
              </p>
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
  coins: PropTypes.array.isRequired,
  denominations: PropTypes.array.isRequired,
  denomination: PropTypes.string.isRequired,
  handleDenominationChange: PropTypes.func.isRequired
};

export default Header;

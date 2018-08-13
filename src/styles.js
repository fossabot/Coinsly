import glamorous from 'glamorous';
import { css } from 'glamor';

const colors = {
  grey_darkest: '#252626',
  grey_dark: '#313535',
  grey: '#454949',
  grey_light: '#555858',
  grey_lightest: '#b8bebb',
  green: '#7ABE94',
  warn: '#EF946C',
  white: '#fff'
};

/**
 * Global styles
 * ----------------
 */
css.global('*', { boxSizing: 'border-box' });
css.global('html', { fontSize: 16 });
css.global('body', {
  backgroundColor: colors.grey_dark,
  color: colors.white,
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  lineHeight: 1.6,
  margin: 0
});
css.global('h1, h2, h3, h4, h5, h6', {
  fontWeight: 500,
  margin: 0,
  lineHeight: 1.2
});
css.global('p', { margin: '0 0 1rem' });
css.global('button', { color: colors.white });

/**
 * Variables
 * ----------------
 */
const deviceWidths = {
  narrow: 400,
  mid: 700,
  wide: 1000
};

export const mediaQueries = {
  narrow: `@media only screen and (min-width: ${deviceWidths.narrow}px)`,
  mid: `@media only screen and (min-width: ${deviceWidths.mid}px)`,
  wide: `@media only screen and (min-width: ${deviceWidths.wide}px)`
};

const baseSpacing = 10;
const borderRadius = 3;

export const spacing = {
  x1: baseSpacing,
  x2: baseSpacing * 2,
  x3: baseSpacing * 3
};

export const zIndexes = {
  header: 1,
  totals: 1,
  menu: 2,
  loading: 99
};

const headerHeight = 100;
const totalsHeight = 50;
const menuWidth = 250;

/**
 * Buttons
 * ----------------
 */
const buttonBase = {
  backgroundColor: colors.grey,
  border: 'none',
  borderRadius,
  color: colors.white,
  padding: spacing.x1
};

export const Button = glamorous.button(buttonBase);
export const LogoutButton = glamorous.button({
  ...buttonBase,
  display: 'none'
});
export const LoginButton = glamorous.button({
  ...buttonBase
});

/**
 * Loading Indicator
 * ----------------
 */
export const LoadingWrapper = glamorous.p(
  {
    color: colors.white,
    margin: 0,
    position: 'fixed',
    right: spacing.x1,
    top: spacing.x1,
    zIndex: zIndexes.loading
  },
  ({ isLoading }) => ({
    display: !isLoading && 'none'
  })
);

/**
 * Header
 * ----------------
 */
export const HeaderWrapper = glamorous.header({
  alignItems: 'center',
  backgroundColor: colors.grey_darkest,
  display: 'flex',
  height: headerHeight,
  justifyContent: 'space-between',
  padding: spacing.x2,
  position: 'fixed',
  textAlign: 'center',
  top: 0,
  width: '100%',
  zIndex: zIndexes.header
});

export const SiteTitle = glamorous.h1({
  fontSize: '2rem',
  fontWeight: 'bold',
  margin: `0 ${spacing.x1}`
});

export const UserWrapper = glamorous.div({
  alignItems: 'center',
  display: 'flex'
});

export const UserAvatar = glamorous.img({
  borderRadius: '50%',
  width: 50
});

/**
 * Menu
 * ----------------
 */
export const MenuWrapper = glamorous.ul(
  {
    backgroundColor: colors.grey,
    bottom: 0,
    left: 0,
    listStyle: 'none',
    margin: 0,
    overflow: 'auto',
    padding: spacing.x2,
    position: 'fixed',
    top: headerHeight + totalsHeight,
    transition: 'margin-left 350ms',
    zIndex: zIndexes.menu,

    [mediaQueries.mid]: {
      borderRight: `solid 5px ${colors.grey_light}`,
      left: 0,
      marginLeft: 0,
      width: menuWidth
    }
  },
  ({ menuOpen }) => ({
    left: menuOpen ? 0 : '-9999px',
    right: menuOpen ? 0 : 'auto',

    [mediaQueries.mid]: {
      marginLeft: menuOpen ? 0 : `-${menuWidth}`
    }
  })
);

export const MenuButton = glamorous.button({
  ...buttonBase
});

export const MenuItem = glamorous.li({
  marginBottom: spacing.x2
});

export const MenuHeading = glamorous.h3({
  fontSize: '1.4rem',
  marginBottom: spacing.x1
});

/**
 * Filters
 * ----------------
 */
export const FilterWrapper = glamorous.label({
  display: 'flex',
  flexWrap: 'wrap'
});

export const FilterLabel = glamorous.label(
  {
    borderRadius,
    display: 'inline-block',
    flexBasis: '100%',
    marginBottom: spacing.x1,
    marginRight: spacing.x1,
    padding: spacing.x1,

    ':hover': {
      backgroundColor: colors.grey_darkest,
      cursor: 'pointer'
    }
  },
  ({ selected }) => ({
    backgroundColor: selected ? colors.grey_darkest : colors.grey_light
  })
);

/**
 * Totals
 * ----------------
 */
export const TotalsWrapper = glamorous.div({
  alignItems: 'center',
  backgroundColor: colors.grey_light,
  display: 'flex',
  flexDirection: 'column',
  height: totalsHeight,
  justifyContent: 'space-between',
  padding: `0 ${spacing.x2}px`,
  position: 'fixed',
  top: headerHeight,
  width: '100%',
  zIndex: zIndexes.totals,

  [mediaQueries.narrow]: {
    flexDirection: 'row'
  }
});

export const TotalsText = glamorous.p({
  margin: 0
});

/**
 * Layout
 * ----------------
 */
export const ContentWrapper = glamorous.div(
  {
    marginTop: headerHeight + totalsHeight,
    padding: spacing.x2,
    transition: 'margin-left 350ms'
  },
  ({ menuOpen }) => ({
    [mediaQueries.mid]: {
      marginLeft: menuOpen ? menuWidth : 0
    }
  })
);

/**
 * Coins
 * ----------------
 */
export const CoinListWrapper = glamorous.ul({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  listStyleType: 'none',
  margin: 0,
  padding: 0
});

const activeCoin = ({ active, owned }) => ({
  color: active ? colors.white : colors.grey_lightest,
  backgroundColor: active ? colors.grey_light : colors.grey,
  border: `solid 3px ${owned ? colors.green : colors.grey_light}`
});

export const CoinListItem = glamorous.li(
  {
    borderRadius,
    flexGrow: 0,
    flexBasis: '30%',
    marginBottom: spacing.x2,

    ':hover': activeCoin({ active: true }),

    [mediaQueries.mid]: {
      flexBasis: '15%'
    },

    [mediaQueries.wide]: {
      flexBasis: '15%'
    }
  },
  ({ owned, show }) => ({
    display: show ? 'block' : 'none',
    ...activeCoin({ owned }),
    ':hover': activeCoin({ owned, active: true })
  })
);

export const TickImage = glamorous.img({
  left: spacing.x1,
  position: 'absolute',
  top: spacing.x1,
  width: 20,

  [mediaQueries.mid]: {
    width: 40
  }
});

export const CoinImg = glamorous.img({
  borderRadius: '50%',
  display: 'block',
  margin: `${spacing.x1}px auto`,
  maxWidth: 150,
  width: '70%',

  [mediaQueries.mid]: {
    marginBottom: spacing.x3,
    marginTop: spacing.x3
  }
},
  ({ owned }) => ({
    border: `solid 3px ${owned ? colors.green : colors.grey_light}`,
  })
);

export const CoinLabel = glamorous.label({
  display: 'block',
  padding: spacing.x1,
  position: 'relative',

  ':hover': { cursor: 'pointer' }
});

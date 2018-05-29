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

export const spacing = {
  base: baseSpacing,
  x2: baseSpacing * 2,
  x3: baseSpacing * 3
};

export const zIndexes = {
  header: 1,
  menuToggle: 2,
  menu: 1,
  loading: 99
};

const headerHeight = 75;
const menuWidth = 250;

/**
 * Buttons
 * ----------------
 */
const buttonBase = {
  backgroundColor: colors.grey,
  border: 'none',
  borderRadius: 3,
  color: colors.white,
  padding: spacing.base
};

export const Button = glamorous.button(buttonBase);
export const LightButton = glamorous.button({
  ...buttonBase,
  backgroundColor: colors.grey_darkest
});
export const TopRightButton = glamorous.button({
  ...buttonBase,
  position: 'absolute',
  right: spacing.x2,
  top: spacing.x2,
  zIndex: zIndexes.menuToggle
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
    left: spacing.base,
    top: spacing.base,
    zIndex: zIndexes.loading
  },
  ({ isLoading }) => ({
    display: !isLoading && 'none'
  })
);

/**
 * Menu
 * ----------------
 */
export const MenuWrapper = glamorous.ul(
  {
    backgroundColor: colors.grey,
    height: '100vh',
    listStyle: 'none',
    margin: 0,
    padding: spacing.x2,
    position: 'absolute',
    top: headerHeight,
    transition: 'margin-left 350ms',
    zIndex: zIndexes.menu
  },
  ({ menuOpen }) => ({
    left: menuOpen ? 0 : '-100%',
    marginLeft: 0,
    width: '100%',

    [mediaQueries.mid]: {
      marginLeft: menuOpen ? 0 : `-${menuWidth}`,
      top: 0,
      width: menuWidth
    }
  })
);

export const MenuItem = glamorous.li({
  marginBottom: spacing.x2
});

/**
 * Layout
 * ----------------
 */
export const MainWrapper = glamorous.div(
  {
    transition: 'margin-left 350ms'
  },
  ({ menuOpen }) => ({
    marginLeft: 0,

    [mediaQueries.mid]: {
      marginLeft: menuOpen ? menuWidth : 0
    }
  })
);

export const ContentWrapper = glamorous.div({
  marginTop: headerHeight,
  padding: spacing.x2
});

/**
 * Header
 * ----------------
 */
export const HeaderWrapper = glamorous.header({
  backgroundColor: colors.grey_darkest,
  padding: spacing.x2,
  position: 'fixed',
  top: 0,
  width: '100%',
  zIndex: zIndexes.header
});

export const SiteTitle = glamorous.h1({
  fontSize: '2rem',
  fontWeight: 'bold',
  margin: 0
});

/**
 * Filters
 * ----------------
 */
export const TotalsWrapper = glamorous.section({
  alignItems: 'baseline',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',

  [mediaQueries.narrow]: {
    flexDirection: 'row'
  }
});

export const FilterLabel = glamorous.label(
  {
    display: 'inline-block',
    marginBottom: spacing.base,
    padding: spacing.base,

    ':hover': {
      backgroundColor: colors.grey_darkest
    }
  },
  ({ selected }) => ({
    backgroundColor: selected ? colors.grey_darkest : colors.grey_light
  })
);

/**
 * Coins
 * ----------------
 */
export const CoinListWrapper = glamorous.ul({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  listStyleType: 'none',
  margin: 0,
  padding: 0,

  [mediaQueries.mid]: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
});

const activeCoin = ({ active, owned }) => ({
  color: active ? colors.white : colors.grey_lightest,
  backgroundColor: active ? colors.grey_light : colors.grey,
  border: `solid 5px ${owned ? colors.green : colors.grey_light}`
});

export const CoinListItem = glamorous.li(
  {
    borderRadius: 3,
    flexGrow: 0,
    marginBottom: spacing.base,

    ':hover': activeCoin({ active: true }),

    [mediaQueries.mid]: {
      flexBasis: '30%'
    },

    [mediaQueries.wide]: {
      flexBasis: '19%'
    }
  },
  ({ owned }) => ({
    ...activeCoin({ owned }),

    ':hover': activeCoin({ owned, active: true })
  })
);

export const TickImage = glamorous.img({
  left: spacing.base,
  position: 'absolute',
  top: spacing.base,
  width: 40
});

export const CoinImg = glamorous.img({
  display: 'block',
  margin: `${spacing.x3}px auto`,
  maxWidth: 150,
  width: '70%'
});

export const CoinLabel = glamorous.label({
  display: 'block',
  padding: spacing.base,
  position: 'relative',

  ':hover': { cursor: 'pointer' }
});

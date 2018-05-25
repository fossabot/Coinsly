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
css.global('h1, h2, h3, h4, h5, h6', { margin: 0, lineHeight: 1.2 });
css.global('p', { margin: '0 0 1rem' });
css.global('button', { color: colors.white });

const baseSpacing = 10;

export const mediaQueries = {
  narrow: '@media only screen and (min-width: 400px)',
  mid: '@media only screen and (min-width: 750px)',
  wide: '@media only screen and (min-width: 1000px)'
};

export const spacing = {
  base: baseSpacing,
  x2: baseSpacing * 2,
  x3: baseSpacing * 3
};

const menuWidth = 200;

export const MenuWrapper = glamorous.ul(
  {
    backgroundColor: colors.grey,
    height: '100vh',
    margin: 0,
    position: 'absolute',
    transition: 'margin-left 350ms',
    zIndex: 2
  },
  ({ menuOpen }) => ({
    width: '100%',
    left: menuOpen ? 0 : '-100%',
    marginLeft: 0,

    [mediaQueries.mid]: {
      marginLeft: menuOpen ? 0 : `-${menuWidth}`,
      width: menuWidth
    }
  })
);

export const MenuToggle = glamorous.button({
  zIndex: 1
});

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

export const HeaderWrapper = glamorous.header({
  backgroundColor: colors.grey_darkest,
  padding: spacing.x2,
  paddingBottom: 0,
  width: '100%'
});

export const HeaderDetailsWrapper = glamorous.div({
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',

  [mediaQueries.mid]: {
    flexDirection: 'row',
    marginBottom: 0
  }
});

export const SiteTitle = glamorous.p({
  fontSize: '2rem',
  fontWeight: 'bold',
  margin: 0
});

export const UserDetailsWrapper = glamorous.div({
  [mediaQueries.mid]: {
    marginLeft: 'auto',
    textAlign: 'right'
  }
});

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
      backgroundColor: colors.grey_light
    }
  },
  ({ selected }) => ({
    backgroundColor: selected ? colors.grey_light : colors.grey
  })
);

export const ContentWrapper = glamorous.div({
  padding: spacing.x2
});

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
    flexBasis: '19%',
    flexGrow: 0,
    marginBottom: spacing.base,
    ':hover': activeCoin({ active: true })
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
  width: 50
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

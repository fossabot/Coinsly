import glamorous from 'glamorous';
import { css } from 'glamor';

css.global('*', { boxSizing: 'border-box' });
css.global('html', { fontSize: 16 });
css.global('body', {
  backgroundColor: '#313535',
  color: '#fff',
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  lineHeight: 1.6,
  margin: 0
});
css.global('h1, h2, h3, h4, h5, h6', { margin: 0, lineHeight: 1.2 });
css.global('p', { margin: '0 0 1rem' });

const baseSpacing = 10;

// const headerHeight = {
//   narrow: 200,
//   mid: 130
// };

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

export const HeaderWrapper = glamorous.header({
  backgroundColor: '#252626',
  // borderBottom: 'solid 1px #aaa',
  // height: headerHeight.narrow,
  padding: spacing.x2,
  paddingBottom: 0,
  // position: 'fixed',
  // top: 0,
  width: '100%'

  // [mediaQueries.mid]: {
  //   height: headerHeight.mid
  // }
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
      backgroundColor: '#3c4352'
    }
  },
  ({ selected }) => ({
    backgroundColor: selected ? '#3c4352' : '#262b35'
  })
);

export const ContentWrapper = glamorous.div({
  // marginTop: headerHeight.narrow,
  padding: spacing.x2

  // [mediaQueries.mid]: {
  //   marginTop: headerHeight.mid
  // }
});

export const CoinListWrapper = glamorous.ul({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  listStyleType: 'none',
  margin: 0,
  padding: 0,

  [mediaQueries.mid]: {
    flexDirection: 'row'
  }
});

const activeCoin = ({ active }) => ({
  color: active ? '#fff' : '#b8bebb',
  backgroundColor: active ? '#555858' : '#454949'
});

export const CoinListItem = glamorous.li(
  {
    flexBasis: '24%',
    flexGrow: 0,
    marginBottom: spacing.base,
    ':hover': activeCoin({ active: true })
  },
  ({ owned }) => activeCoin({ active: owned })
);

export const CoinImg = glamorous.img({
  display: 'block',
  margin: `${spacing.x3}px auto`,
  maxWidth: 150,
  width: '70%'
});

export const CoinLabel = glamorous.label({
  display: 'block',
  padding: spacing.base,
  ':hover': { cursor: 'pointer' }
});

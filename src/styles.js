import glamorous from 'glamorous';
import { css } from 'glamor';

css.global('*', { boxSizing: 'border-box' });
css.global('html', { fontSize: 16 });
css.global('body', {
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  lineHeight: 1.6,
  margin: 0
});
css.global('h1, h2, h3, h4, h5, h6', { margin: 0, lineHeight: 1.2 });

const baseSpacing = 10;

const headerHeight = {
  narrow: 200,
  mid: 130
};

export const mediaQueries = {
  narrow: '@media only screen and (min-width: 400px)',
  mid: '@media only screen and (min-width: 750px)',
  wide: '@media only screen and (min-width: 1000px)'
};

export const spacing = {
  base: baseSpacing,
  x2: baseSpacing * 2
};

export const HeaderWrapper = glamorous.header({
  backgroundColor: '#fff',
  borderBottom: 'solid 1px #aaa',
  height: headerHeight.narrow,
  padding: spacing.x2,
  position: 'fixed',
  top: 0,
  width: '100%',

  [mediaQueries.mid]: {
    height: headerHeight.mid
  }
});

export const HeaderDetailsWrapper = glamorous.div({
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
  marginBottom: spacing.x2,

  [mediaQueries.mid]: {
    flexDirection: 'row',
    marginBottom: 0
  }
});

export const UserDetailsWrapper = glamorous.div({
  [mediaQueries.mid]: {
    marginLeft: 'auto',
    textAlign: 'right'
  }
});

export const FiltersWrapper = glamorous.section({
  alignItems: 'baseline',
  display: 'flex',
  justifyContent: 'space-between'
});

export const ContentWrapper = glamorous.div({
  marginTop: headerHeight.narrow,
  padding: spacing.x2,

  [mediaQueries.mid]: {
    marginTop: headerHeight.mid
  }
});

export const CoinListWrapper = glamorous.ul({
  display: 'flex',
  flexWrap: 'wrap',
  flexDirection: 'column',
  listStyleType: 'none',
  margin: 0,
  padding: 0,

  [mediaQueries.mid]: {
    flexDirection: 'row'
  }
});

export const CoinListItem = glamorous.li({
  border: 'solid 1px #eee',
  flexBasis: `${100 / 3}%`,
  flexGrow: 0,
  marginBottom: spacing.base,
  padding: spacing.base
});

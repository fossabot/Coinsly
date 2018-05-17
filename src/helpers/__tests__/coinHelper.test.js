import coinHelper from '../../helpers/coinHelper';

describe('getDenominations', () => {
  it('thows if `coins` is undefined', () => {
    // Arrange
    const coins = undefined;

    // Act & Assert
    expect(() => coinHelper.getDenominations(coins)).toThrow();
  });

  it('thows if `coins` is null', () => {
    // Arrange
    const coins = null;

    // Act & Assert
    expect(() => coinHelper.getDenominations(coins)).toThrow();
  });

  it('does not thow if `coins` is empty array', () => {
    // Arrange
    const coins = [];

    // Act & Assert
    expect(() => coinHelper.getDenominations(coins)).not.toThrow();
  });

  it('returns empty array if `coins` is empty array', () => {
    // Arrange
    const coins = [];

    // Act
    const result = coinHelper.getDenominations(coins);

    // Assert
    expect(result).toEqual([]);
  });

  it('returns empty array if `coins` is array of objects with no denomination property', () => {
    // Arrange
    const coins = [{ id: 1 }, { id: 2 }];

    // Act
    const result = coinHelper.getDenominations(coins);

    // Assert
    expect(result).toEqual([]);
  });

  it('returns denominations when they exist', () => {
    // Arrange
    const coins = [{ denomination: 1 }, { denomination: 2 }];

    // Act
    const result = coinHelper.getDenominations(coins);

    // Assery
    expect(result).toEqual([1, 2]);
  });

  it('filters duplicate denominations', () => {
    // Arrange
    const coins = [
      { denomination: 1 },
      { denomination: 1 },
      { denomination: 2 },
      { denomination: 2 }
    ];

    // Act
    const result = coinHelper.getDenominations(coins);

    // Assery
    expect(result).toEqual([1, 2]);
  });
});

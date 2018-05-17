import React from 'react';
import { render, Simulate, flushPromises } from 'react-testing-library';
import Coin from '../Coin';

it('coin markup is correct', () => {
  // Arrange
  const coin = { id: 2, name: 'Kew Gardens' };
  const component = <Coin coin={coin} />;

  // Act
  const { container } = render(component);

  // Assert
  expect(container.firstChild).toMatchSnapshot();
});

it('label text content is correct', () => {
  // Arrange
  const coin = { id: 2, name: 'Kew Gardens' };
  const component = <Coin coin={coin} />;

  // Act
  const { getByTestId } = render(component);

  // Assert
  expect(getByTestId('coin-label').textContent).toBe('Kew Gardens');
});

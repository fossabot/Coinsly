import React from 'react';
import { render, Simulate, flushPromises } from 'react-testing-library';
import Coin from '../src/components/Coin';

it('coin markup is correct', () => {
  // Arrange
  const coin = { id: 2, name: 'B - Bond... James Bond' };

  // Act
  const { container } = render(
    <Coin coin={coin} handleOwnedCheckboxChange={() => {}} />
  );

  // Assert
  expect(container.firstChild).toMatchSnapshot();
});

it('label text content is correct', () => {
  // Arrange
  const coin = { id: 2, name: 'B - Bond... James Bond' };

  // Act
  const { getByTestId } = render(
    <Coin coin={coin}/>
  );

  // Assert
  expect(getByTestId('coin-label').textContent).toBe('I own this');
});

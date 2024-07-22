import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import FavouriteListItem from '../../components/FavouriteListItem'; // Adjust the import path if necessary
import FoodItemModal from '../../components/FoodItemModal'; // Adjust the import path if necessary


jest.mock('../../components/FoodItemModal', () => 'FoodItemModal');

describe('FavouriteListItem', () => {
  const mockItem = {
    food_name: 'Test Food',
    calories: 200,
  };

  const mockOnAdd = jest.fn();

  test('renders correctly', () => {
    const { getByText } = render(<FavouriteListItem item={mockItem} onAdd={mockOnAdd} />);
    expect(getByText('Test Food')).toBeTruthy();
    expect(getByText('200 cal per serving')).toBeTruthy();
  });

  test('shows ActivityIndicator when adding', async () => {
    const { getByText, getByTestId } = render(<FavouriteListItem item={mockItem} onAdd={mockOnAdd} />);
    const addButton = getByTestId('add-button');
    fireEvent.press(addButton);
    expect(getByTestId('activity-indicator')).toBeTruthy();
  });

  test('calls onAdd with item after delay', async () => {
    jest.useFakeTimers();
    const { getByTestId } = render(<FavouriteListItem item={mockItem} onAdd={mockOnAdd} />);
    const addButton = getByTestId('add-button');
    fireEvent.press(addButton);
    jest.runAllTimers();
    await waitFor(() => {
      expect(mockOnAdd).toHaveBeenCalledWith(mockItem);
    });
  });

  test('opens FoodItemModal when pressed', () => {
    const { getByTestId } = render(<FavouriteListItem item={mockItem} onAdd={mockOnAdd} />);
    const itemButton = getByTestId('item-button');
    fireEvent.press(itemButton);
    expect(getByTestId('food-item-modal')).toBeTruthy();
  });
});

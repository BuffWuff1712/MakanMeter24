import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import SearchListItem from '../../components/SearchListItem';

describe('SearchListItem Component', () => {
  const mockItem = { food_name: 'Apple', serving_qty: 1, serving_unit: 'piece' };
  const mockOnAdd = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('renders correctly', () => {
    const { getByText } = render(<SearchListItem item={mockItem} onAdd={mockOnAdd} />);
    expect(getByText('Apple')).toBeTruthy();
    expect(getByText('1 piece')).toBeTruthy();
  });

  it('calls onAdd when plus icon is pressed', async () => {
    const { getByTestId } = render(<SearchListItem item={mockItem} onAdd={mockOnAdd} />);
    const addButton = getByTestId('add-button');

    fireEvent.press(addButton);

    jest.runAllTimers();

    await waitFor(() => {
      expect(mockOnAdd).toHaveBeenCalledWith('Apple');
    });
  });

  it('displays loading indicator when add button is pressed', async () => {
    const { getByTestId } = render(<SearchListItem item={mockItem} onAdd={mockOnAdd} />);
    
    fireEvent.press(getByTestId('add-button'));

    expect(getByTestId('loading-indicator')).toBeTruthy();
  });

  it('displays plus icon when not loading', () => {
    const { getByTestId } = render(<SearchListItem item={mockItem} onAdd={mockOnAdd} />);
    expect(getByTestId('plus-icon')).toBeTruthy();
  });
});

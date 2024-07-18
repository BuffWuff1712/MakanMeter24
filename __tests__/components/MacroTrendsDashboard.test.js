import React from 'react';
import { render } from '@testing-library/react-native';
import MacroTrendsDashboard from '../../components/MacroTrends'; // Adjust the import path as needed
import { useGlobalContext } from '../../context/GlobalProvider';

// Mock the useGlobalContext hook
jest.mock('../../context/GlobalProvider', () => ({
  useGlobalContext: jest.fn(),
}));

describe('MacroTrendsDashboard Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the component correctly with data', () => {
    useGlobalContext.mockReturnValue({ period: 1 });

    const data = [
      { total_carbohydrates: 150, total_protein: 50, total_fats: 20, meal_date: '2023-07-01' },
      { total_carbohydrates: 200, total_protein: 60, total_fats: 25, meal_date: '2023-07-02' },
    ];

    const { getByTestId } = render(<MacroTrendsDashboard data={data} />);

    expect(getByTestId('carbohydrates-value')).toHaveTextContent('175.00g');
    expect(getByTestId('protein-value')).toHaveTextContent('55.00g');
    expect(getByTestId('fats-value')).toHaveTextContent('22.50g');

  });

  test('renders the empty state correctly', () => {
    useGlobalContext.mockReturnValue({ period: 1 });

    const data = [];

    const { getByText } = render(<MacroTrendsDashboard data={data} />);

    expect(getByText('No macro intake data available.')).toBeTruthy();
    expect(getByText('Start by logging in your meal today!')).toBeTruthy();
  });
});

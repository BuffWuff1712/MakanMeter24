import React from 'react';
import { render } from '@testing-library/react-native';
import CaloriesTrendsDashboard from '../../components/CaloriesTrends'; // Adjust the import path as needed
import { useGlobalContext } from '../../context/GlobalProvider';

// Mock the useGlobalContext hook
jest.mock('../../context/GlobalProvider', () => ({
  useGlobalContext: jest.fn(),
}));

describe('CaloriesTrendsDashboard Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the component correctly with data', () => {
    useGlobalContext.mockReturnValue({ period: 1 });

    const data = [
      { total_calories: 500, meal_date: '2023-07-01' },
      { total_calories: 700, meal_date: '2023-07-02' },
    ];
    const goal = 2000;

    const { getByText, getByTestId } = render(<CaloriesTrendsDashboard data={data} goal={goal} />);

    expect(getByText('Calorie Intake')).toBeTruthy();
    expect(getByText('Calories under weekly goal')).toBeTruthy();
    expect(getByText('Daily Average')).toBeTruthy();
    expect(getByTestId('avg-total-calories').props.children).toBe(1200);
    expect(getByTestId('avg-calories').props.children).toBe(600);
    expect(getByTestId('goal-weekly').props.children).toBe(`${goal * 7}`);
    expect(getByTestId('goal-daily').props.children).toBe(`${goal}`);
  });

  test('renders the empty state correctly', () => {
    useGlobalContext.mockReturnValue({ period: 1 });

    const data = [];
    const goal = 2000;

    const { getByText } = render(<CaloriesTrendsDashboard data={data} goal={goal} />);

    expect(getByText('No calorie intake data available.')).toBeTruthy();
    expect(getByText('Start by logging in your meal today!')).toBeTruthy();
  });
});

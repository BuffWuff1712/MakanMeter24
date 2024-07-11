import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import WaterIntake from '../../components/WaterIntake';
import { fetchWaterIntake, updateWaterIntake } from '../../lib/supabase';
import { useGlobalContext } from '../../context/GlobalProvider';

jest.mock('../../lib/supabase');
jest.mock('../../context/GlobalProvider');
jest.mock('../../lib/calculations/getDate', () => ({
  getDate: jest.fn(() => '2023-07-01'),
}));

describe('WaterIntake Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockUser1 = { id: 'user1' };
  const mockSelectedDate = new Date();
  const mockSetRefresh = jest.fn();

  useGlobalContext.mockReturnValue({
    user: mockUser1,
    selectedDate: mockSelectedDate,
    setRefresh: mockSetRefresh,
  });

  test('renders the water intake component correctly for user1', async () => {
    const { getByTestId } = render(<WaterIntake />);

    await waitFor(() => {
      expect(getByTestId('waterIntakeTitle').props.children).toBe('Water Intake');
      expect(getByTestId('waterIntakeVolume').props.children.join('')).toBe('1.50 / 2.00 L');
    });

    for (let i = 0; i < 8; i++) {
      const icon = getByTestId(`drinkIcon-${i}`);
      if (i < 6) {
        expect(icon.props.style).toEqual(expect.arrayContaining([{ opacity: 1 }]));
      } else {
        expect(icon.props.style).toEqual(expect.arrayContaining([{ opacity: 0.3 }]));
      }
    }
  });

  test('handles fetch water intake error', async () => {
    fetchWaterIntake.mockRejectedValue(new Error('Fetch error'));

    const { getByTestId } = render(<WaterIntake />);

    await waitFor(() => {
      expect(getByTestId('waterIntakeVolume').props.children.join('')).toBe('0.00 / 2.00 L');
    });
  });
});

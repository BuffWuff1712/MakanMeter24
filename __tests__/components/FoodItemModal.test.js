import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import FoodItemModal from '../../components/FoodItemModal';
import { useGlobalContext } from '../../context/GlobalProvider';

jest.mock('@gorhom/bottom-sheet', () => ({
  BottomSheetModal: jest.fn(({ children }) => children),
  BottomSheetScrollView: jest.fn(({ children }) => children),
}));

// Mock the useGlobalContext hook
jest.mock('../../context/GlobalProvider', () => ({
    useGlobalContext: jest.fn(),
  }));

jest.mock('../../lib/calculations/calculateNutriScore', () => ({
  getProductNutriScore: jest.fn(() => ({
    nutri_score: 'A',
    description: 'Healthy',
  })),
}));

jest.mock('../../components/GradeBar', () => 'GradeBar');
jest.mock('../../components/ServingTypes', () => 'ServingTypes');
jest.mock('../../components/CustomButton', () => 'CustomButton');

describe('FoodItemModal', () => {
  const mockItem = {
    food_name: 'Test Food',
    calories: 200,
    carbohydrates: 20,
    protein: 10,
    fats: 5,
    quantity: 1,
    food_item_id: 1,
    meal_item_id: 1,
  };

  const mockAddPress = jest.fn();
  const mockGlobalContext = {
    user: { id: 'user123' },
    setRefresh: jest.fn(),
    isAsyncOperationsComplete: true,
  };

  beforeEach(() => {
    useGlobalContext.mockReturnValue(mockGlobalContext);
  });

  test('renders correctly', () => {
    const { getByText } = render(
      <FoodItemModal
        bottomSheetModalRef={{ current: { present: jest.fn() } }}
        snapPoints={['85%']}
        item={mockItem}
        modeAdd={true}
        addPress={mockAddPress}
      />
    );
    expect(getByText('Test Food')).toBeTruthy();
    expect(getByText('Calories')).toBeTruthy();
    expect(getByText('Carbs')).toBeTruthy();
    expect(getByText('Proteins')).toBeTruthy();
    expect(getByText('Fats')).toBeTruthy();
  });

});

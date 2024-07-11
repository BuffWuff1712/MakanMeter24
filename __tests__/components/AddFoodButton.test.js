// __tests__/AddFoodButton.test.js
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import AddFoodButton from '../../components/AddFoodButton'; // Adjust the import path as needed
import { useAddFoodButton } from '../../context/AddFoodButtonContext';
import { Animated } from 'react-native';

// Mock the useAddFoodButton hook
jest.mock('../../context/AddFoodButtonContext', () => ({
  useAddFoodButton: jest.fn(),
}));

// Mock the expo vector icons hook
jest.mock('@expo/vector-icons', () => ({
    FontAwesome5: '',
  }));

describe('AddFoodButton Component', () => {
  let handlePress1Mock, buttonSizeMock, rotationMock, onPressMock;

  beforeEach(() => {
    handlePress1Mock = jest.fn();
    buttonSizeMock = new Animated.Value(1);
    rotationMock = new Animated.Value(0);
    onPressMock = jest.fn();

    useAddFoodButton.mockReturnValue({
      handlePress1: handlePress1Mock,
      buttonSize: buttonSizeMock,
      rotation: rotationMock,
    });
  });

  test('renders the AddFoodButton correctly', () => {
    const { getByTestId } = render(<AddFoodButton />);

    const button = getByTestId('add-food-button');
    expect(button).toBeTruthy();

    const icon = getByTestId('add-food-icon');
    expect(icon).toBeTruthy();
  });

  test('calls handlePress1 from context when button is pressed', () => {
    const { getByTestId } = render(<AddFoodButton />);

    fireEvent.press(getByTestId('add-food-button'));
    expect(handlePress1Mock).toHaveBeenCalled();
  });

  test('calls onPress prop function when button is pressed', () => {
    const { getByTestId } = render(<AddFoodButton onPress={onPressMock} />);

    fireEvent.press(getByTestId('add-food-button'));
    expect(onPressMock).toHaveBeenCalled();
  });
});

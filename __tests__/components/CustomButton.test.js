import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CustomButton from '../../components/CustomButton'; // Adjust the import path as needed

describe('CustomButton Component', () => {
  test('renders the button with the given title', () => {
    const { getByTestId } = render(
      <CustomButton title="Click Me" handlePress={() => {}} isLoading={false} />
    );

    expect(getByTestId('buttonText').props.children).toBe('Click Me');
  });

  test('calls handlePress when the button is clicked', () => {
    const handlePress = jest.fn();

    const { getByTestId } = render(
      <CustomButton title="Click Me" handlePress={handlePress} isLoading={false} />
    );

    fireEvent.press(getByTestId('customButton'));
    expect(handlePress).toHaveBeenCalledTimes(1);
  });

  test('displays ActivityIndicator when loading', () => {
    const { getByTestId, queryByTestId } = render(
      <CustomButton title="Click Me" handlePress={() => {}} isLoading={true} />
    );

    expect(getByTestId('customButton').props.accessibilityState.disabled).toBe(true);
    expect(getByTestId('activityIndicator')).toBeTruthy();
    expect(queryByTestId('buttonText')).toBeNull();
  });
});

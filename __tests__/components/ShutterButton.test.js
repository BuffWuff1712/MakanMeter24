import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ShutterButton from '../../components/ShutterButton'; // Adjust the import path

describe('ShutterButton Component', () => {
  it('calls handlePress when the button is pressed', () => {
    const mockHandlePress = jest.fn();

    const { getByTestId } = render(<ShutterButton handlePress={mockHandlePress} />);

    const button = getByTestId('shutterButton');
    fireEvent.press(button);

    expect(mockHandlePress).toHaveBeenCalled();
  });

  it('renders the shutter image correctly', () => {
    const { getByTestId } = render(<ShutterButton handlePress={() => {}} />);

    const image = getByTestId('shutterImage');
    expect(image).toBeTruthy();
  });
});

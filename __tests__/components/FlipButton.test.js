import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import FlipButton from '../../components/FlipButton'; // Adjust the path as necessary

describe('FlipButton Component', () => {
  test('renders correctly', () => {
    const { getByTestId } = render(<FlipButton handlePress={() => {}} />);
    
    const button = getByTestId('flipButton');
    const image = getByTestId('flipButtonImage');
    
    expect(button).toBeTruthy();
    expect(image).toBeTruthy();
  });

  test('calls handlePress when pressed', () => {
    const handlePressMock = jest.fn();
    const { getByTestId } = render(<FlipButton handlePress={handlePressMock} />);
    
    const button = getByTestId('flipButton');
    fireEvent.press(button);
    
    expect(handlePressMock).toHaveBeenCalledTimes(1);
  });
});

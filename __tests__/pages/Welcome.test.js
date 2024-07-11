// __tests__/Welcome.test.js
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Welcome from '../../app/index'; // Adjust the import path as needed
import { useGlobalContext } from '../../context/GlobalProvider';
import {router, Redirect} from '../../__mocks__/expo-router'

// Mock the useGlobalContext hook
jest.mock('../../context/GlobalProvider', () => ({
  useGlobalContext: jest.fn(),
}));

describe('Welcome Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the Welcome screen correctly', () => {
    useGlobalContext.mockReturnValue({ isLoading: false, isLoggedIn: false });

    const { getByText } = render(<Welcome />);

    expect(getByText('Start Your Journey Today with MakanMeter')).toBeTruthy();
    expect(getByText('Login')).toBeTruthy();
    expect(getByText('Sign Up')).toBeTruthy();
  });

  test('redirects to home when user is logged in', () => {
    useGlobalContext.mockReturnValue({ isLoading: false, isLoggedIn: true });

    const { getByText } = render(<Welcome />);

    expect(getByText('Redirect to /home')).toBeTruthy();
  });

  test('navigates to sign-in screen when Login button is pressed', () => {
    useGlobalContext.mockReturnValue({ isLoading: false, isLoggedIn: false });

    const { getByText } = render(<Welcome />);

    fireEvent.press(getByText('Login'));
    expect(router.push).toHaveBeenCalledWith('/sign-in');
  });

  test('navigates to sign-up screen when Sign Up button is pressed', () => {
    useGlobalContext.mockReturnValue({ isLoading: false, isLoggedIn: false });

    const { getByText } = render(<Welcome />);

    fireEvent.press(getByText('Sign Up'));
    expect(router.push).toHaveBeenCalledWith('/sign-up');
  });

  test('shows loader when loading', () => {
    useGlobalContext.mockReturnValue({ isLoading: true, isLoggedIn: false });

    const { getByTestId } = render(<Welcome />);
    expect(getByTestId('loader')).toBeTruthy();
  });
});

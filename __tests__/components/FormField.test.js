import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import FormField from '../../components/FormField'; // Adjust the import path
import { icons } from '../../constants';

describe('FormField Component', () => {
  const mockHandleChangeText = jest.fn();
  
  const defaultProps = {
    title: 'Username',
    value: '',
    placeholder: 'Enter your username',
    handleChangeText: mockHandleChangeText,
    otherStyles: ''
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the form field correctly', () => {
    const { getByTestId } = render(<FormField {...defaultProps} />);

    expect(getByTestId('formFieldTitle').props.children).toBe('Username');
    expect(getByTestId('formFieldInput').props.placeholder).toBe('Enter your username');
  });

  it('calls handleChangeText when text is changed', () => {
    const { getByTestId } = render(<FormField {...defaultProps} />);

    const input = getByTestId('formFieldInput');
    fireEvent.changeText(input, 'new text');

    expect(mockHandleChangeText).toHaveBeenCalledWith('new text');
  });

  it('toggles password visibility', () => {
    const passwordProps = {
      ...defaultProps,
      title: 'Password',
      value: 'password123',
      placeholder: 'Enter your password',
    };

    const { getByTestId } = render(<FormField {...passwordProps} />);

    const input = getByTestId('formFieldInput');
    const toggleButton = getByTestId('togglePasswordVisibility');
    const icon = getByTestId('passwordVisibilityIcon');

    // Initially, password should be hidden
    expect(input.props.secureTextEntry).toBe(true);
    expect(icon.props.source).toBe(icons.eye);

    // Toggle password visibility
    fireEvent.press(toggleButton);

    // Password should be visible now
    expect(input.props.secureTextEntry).toBe(false);
    expect(icon.props.source).toBe(icons.eyeHide);

    // Toggle again to hide password
    fireEvent.press(toggleButton);

    // Password should be hidden again
    expect(input.props.secureTextEntry).toBe(true);
    expect(icon.props.source).toBe(icons.eye);
  });
});

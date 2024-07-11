import React from 'react';
import { render } from '@testing-library/react-native';
import { Platform, ActivityIndicator } from 'react-native';
import Loader from '../../components/Loader';

describe('Loader Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('does not render when isLoading is false', () => {
    const { queryByTestId } = render(<Loader isLoading={false} />);
    expect(queryByTestId('loader')).toBeNull();
  });

  test('renders correctly when isLoading is true', () => {
    const { getByTestId } = render(<Loader isLoading={true} />);
    expect(getByTestId('loader')).toBeTruthy();
  });

  test('renders ActivityIndicator with correct props', () => {
    const { getByTestId } = render(<Loader isLoading={true} />);
    const activityIndicator = getByTestId('loader').findByType(ActivityIndicator);

    expect(activityIndicator.props.animating).toBe(true);
    expect(activityIndicator.props.color).toBe('#fff');
    expect(activityIndicator.props.size).toBe(Platform.OS === 'ios' ? 'large' : 50);
  });
});

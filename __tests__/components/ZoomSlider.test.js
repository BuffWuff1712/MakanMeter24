import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ZoomSlider from '../../components/ZoomSlider';

describe('ZoomSlider Component', () => {
  const mockFunc = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders the ZoomSlider component correctly', () => {
    const { getByTestId } = render(<ZoomSlider func={mockFunc} />);
    expect(getByTestId('zoomSliderMinus')).toBeTruthy();
    expect(getByTestId('zoomSliderPlus')).toBeTruthy();
    expect(getByTestId('zoomSliderSlider')).toBeTruthy();
  });

  test('calls the function on value change', () => {
    const { getByTestId } = render(<ZoomSlider func={mockFunc} />);
    const slider = getByTestId('zoomSliderSlider');
    fireEvent(slider, 'valueChange', 0.02);
    expect(mockFunc).toHaveBeenCalledWith(0.02);
  });

  test('Slider has correct initial values', () => {
    const { getByTestId } = render(<ZoomSlider func={mockFunc} />);
    const slider = getByTestId('zoomSliderSlider');
    expect(slider.props.minimumValue).toBe(0);
    expect(slider.props.maximumValue).toBe(0.05);
    expect(slider.props.step).toBe(0.0001);
    expect(slider.props.minimumTrackTintColor).toBe('#10b981');
    expect(slider.props.maximumTrackTintColor).toBe('#CDCDE0');
  });
});

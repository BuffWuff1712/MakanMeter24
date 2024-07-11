import React from 'react';
import { render } from '@testing-library/react-native';
import GradeBar from '../../components/GradeBar';

describe('GradeBar Component', () => {
  const grades = ['A', 'B', 'C', 'D', 'E'];
  const gradeColors = {
    A: '#047857',
    B: '#84cc16',
    C: '#facc15',
    D: '#f97316',
    E: '#dc2626'
  };

  test('renders the grade bar with all grades', () => {
    const { getByTestId } = render(<GradeBar grade="A" />);
    
    grades.forEach(grade => {
      expect(getByTestId(`gradeText-${grade}`)).toBeTruthy();
    });
  });

  test('highlights the selected grade', () => {
    const { getByTestId } = render(<GradeBar grade="B" />);
    
    const selectedGrade = getByTestId('highlightText-B');
    expect(selectedGrade).toBeTruthy();
    expect(selectedGrade.props.style).toEqual({
      color: 'white',
      fontSize: 35,
      fontWeight: 'bold'
    });
  });

  test('applies the correct background color for the selected grade', () => {
    const { getByTestId } = render(<GradeBar grade="C" />);
    
    const selectedGrade = getByTestId('selectedGrade-C');
    expect(selectedGrade.props.style).toContainEqual({ backgroundColor: gradeColors['C'] });
  });

  test('renders grade text with default style', () => {
    const { getByTestId } = render(<GradeBar grade="D" />);
    
    const grade = getByTestId('gradeText-A'); // Check for a non-selected grade
    expect(grade.props.style).toEqual({
      color: '#b0b0b0',
      fontSize: 18,
      fontWeight: 'bold'
    });
  });
});

import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const grades = ['A', 'B', 'C', 'D', 'E'];
const gradeColors = {
  A: '#047857',
  B: '#84cc16',
  C: '#facc15',
  D: '#f97316',
  E: '#dc2626'
};

const GradeBar = ({ grade }) => {
  return (
    <View style={styles.container} testID="gradeBarContainer">
      {grades.map((g, index) => (
        <View key={index} style={styles.gradeWrapper} testID={`gradeWrapper-${g}`}>
          <View style={styles.gradeContainer} testID={`gradeContainer-${g}`}>
            <Text style={styles.gradeText} testID={`gradeText-${g}`}>{g}</Text>
          </View>
          {g === grade && (
            <View style={[styles.selectedGrade, { backgroundColor: gradeColors[g] }]} testID={`selectedGrade-${g}`}>
              <Text style={styles.highlightText} testID={`highlightText-${g}`}>{g}</Text>
            </View>
          )}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    position: 'relative',
  },
  gradeWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradeContainer: {
    paddingVertical: 10,
  },
  gradeText: {
    color: '#b0b0b0',
    fontSize: 18,
    fontWeight: 'bold',
  },
  selectedGrade: {
    position: 'absolute',
    width: 78,
    height: 78,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  highlightText: {
    color: 'white',
    fontSize: 35,
    fontWeight: 'bold',
  },
});

export default GradeBar;

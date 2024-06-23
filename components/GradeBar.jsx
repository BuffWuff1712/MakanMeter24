import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

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
    <View style={styles.container}>
      {grades.map((g, index) => (
        <View key={index} style={styles.gradeWrapper}>
          <View style={styles.gradeContainer}>
            <Text style={styles.gradeText}>{g}</Text>
          </View>
          {g === grade && (
            <View style={[styles.selectedGrade, { backgroundColor: gradeColors[g] }]}>
              <Text style={styles.highlightText}>{g}</Text>
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

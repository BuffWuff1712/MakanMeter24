import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import LottieView from 'lottie-react-native';
import icons from '../constants/icons';

const LoadingScreen = ({text}) => {
  return (
    <View style={styles.container}>
      <LottieView
        source={icons.loadingCircle} // Update this path
        autoPlay
        loop
        style={styles.animation}
      />
      <Text style={styles.loadingText}>{text}...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  animation: {
    width: 200,
    height: 200,
  },
  loadingText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
  },
});

export default LoadingScreen;

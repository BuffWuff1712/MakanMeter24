import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { icons } from '../constants';
import * as Progress from 'react-native-progress';
import { useGlobalContext } from '../context/GlobalProvider';

const StreakBar = ({ totalDays }) => {
  const { streak } = useGlobalContext();

  return (
      <View style={styles.container}>
      <View style={styles.header}>
          <Text style={styles.title}>30 Day Challenge</Text>
          <Text style={styles.progressText}>Day {streak} of {totalDays}</Text>
      </View>
      <View style={styles.progressContainer}>
          <Progress.Bar progress={streak/7} height={10} width={100} 
          color={"orange"} unfilledColor='whitesmoke' 
          borderColor='whitesmoke' borderRadius={30} 
          animated={true} style={{position: "absolute"}}/>
          <Progress.Bar progress={(streak-7)/7} height={10} width={100} 
          color={"orange"} unfilledColor='whitesmoke' 
          borderColor='whitesmoke' borderRadius={30} 
          animated={true} style={{position: "absolute", left: 100}}/>
          <Progress.Bar progress={(streak-14)/16} height={10} width={100} 
          color={"orange"} unfilledColor='whitesmoke' 
          borderColor='whitesmoke' borderRadius={30} 
          animated={true} style={{position: "absolute", left: 200}}/>
          <View style={styles.iconContainer}>
              <View className="left-[80px]">
                  <Image 
                      source={streak >= 7 ? icons.seven : icons.seven_grayscale} 
                      className="h-[30px] w-[30px]"/>
              </View>
              <View className="left-[28px]">
                  <Image 
                      source={streak >= 14 ? icons.fourteen : icons.fourteen_grayscale} 
                      className="h-[30px] w-[30px]" />
              </View>
              <View>
                  <Image 
                      source={streak >= totalDays ? icons.thirty : icons.thirty_grayscale} 
                      className="h-[30px] w-[30px]" />
              </View>
          </View>
      </View>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    width: "90%",
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  progressText: {
    fontSize: 16,
    color: '#aaa',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    height: 10,
    backgroundColor: '#ffa500',
    borderRadius: 5,
    position: 'absolute',
    left: 0,
    top: 18,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});

export default StreakBar;

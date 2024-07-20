import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import images from '../constants/images';
import { router } from 'expo-router';

const PlanCard = ({ item, name, description }) => {

  const plan = JSON.parse(item);

  const handlePress = () => {
    router.navigate({
      pathname: 'plan_info',
      params: { 
        item: item,
        name: name,
      },
  })};
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={handlePress}>
      <View style={styles.planCard}>
        <View style={styles.textContainer}>
          <Text style={styles.planSubtitle}>BE STRONG</Text>
          <Text style={styles.planTitle}>{name}</Text>
          <Text style={styles.planDescription}>{description}</Text>
        </View>
        <View style={styles.imageBackground}>
          <Image source={images[plan.image]} style={styles.image} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  planCard: {
    width: 250,
    height: 150,
    borderRadius: 10,
    overflow: 'hidden',
    marginHorizontal: 5,
    backgroundColor: '#0f766e', // Dark green background
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  textContainer: {
    flex: 1,
    width: '100%',
    marginRight: -80,
  },
  planSubtitle: {
    fontSize: 10,
    color: '#fff',
    marginBottom: 5,
  },
  planTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  planDescription: {
    fontSize: 14,
    color: '#fff',
  },
  imageBackground: {
    backgroundColor: '#e4e4e7',
    width: 180,
    height: 180,
    borderRadius: 90,
    left: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 180,
    height: 180,
    borderRadius: 90,
  },
});

export default PlanCard;

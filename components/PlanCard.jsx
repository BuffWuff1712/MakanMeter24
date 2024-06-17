import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import images from '../constants/images';

const PlanCard = ({ name, description, image }) => {
  return (
    <View style={styles.planCard}>
      <View style={styles.textContainer}>
        <Text style={styles.planSubtitle}>BE STRONG</Text>
        <Text style={styles.planTitle}>{name}</Text>
        <Text style={styles.planDescription}>{description}</Text>
      </View>
      <View style={styles.imageBackground}>
        <Image source={images.fruit_salad} style={styles.image} />
      </View>
      
    </View>
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
    width: 130,
    height: 130,
    borderRadius: 65,
  },
});

export default PlanCard;

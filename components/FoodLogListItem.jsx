import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
// Ensure to have the correct path for icons
import { icons } from "../constants"

const FoodLogListItem = ({ item }) => {
  const [borderColor, setBorderColor] = useState('transparent');
  const [selectIcon, setSelectIcon] = useState(icons.noSelect);

  const handlePress = () => {
    Alert.alert("Delete item")
  };

  return (
    <Pressable
      style={[styles.button, { borderColor }]}
      activeOpacity={0.7}
    >
      <View style={{ flex: 1, gap: 5 }}>
        <Text style={styles.foodName}>{item.food_name}</Text>
        <Text style={styles.foodDetails}>
          {item.calories} kcal per serving
        </Text>
      </View>
      <Pressable onPress={handlePress}>
        <AntDesign name="closecircleo" size={30} color="#000000" />
      </Pressable>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#fff',
    padding: 15,
    borderWidth: 2,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 5,
  },
  foodName: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  foodDetails: {
    fontSize: 14,
    color: '#666',
  },
});

export default FoodLogListItem;

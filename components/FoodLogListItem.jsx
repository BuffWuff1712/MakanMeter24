import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Pressable, TouchableOpacity } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';
import FoodItemModal from './FoodItemModal';

const FoodLogListItem = ({ item, onDelete }) => {
  const [borderColor, setBorderColor] = useState('transparent');
  const [isLoading, setIsLoading] = useState(false);
  const bottomSheetModalRef = useRef(null);
  const snapPoints = ['85%'];

  const handlePress = async () => {
    setIsLoading(true);
    // Set a delay before calling the deletion function
    setTimeout(async () => {
      await onDelete(item.meal_item_id);
      console.log("item deleted");
      setIsLoading(false);
    }, 1000); // 1000 milliseconds (1 second) delay
  };
  
  console.log(item);

  return (
    <>
      <TouchableOpacity
        style={[styles.button, { borderColor }]}
        activeOpacity={0.7}
        onPress={() => {bottomSheetModalRef.current?.present();}}
      >
        <View style={{ flex: 1, gap: 5 }}>
          <Text style={styles.foodName}>{item.food_name}</Text>
          <Text style={styles.foodDetails}>
            {item.calories} kcal per serving {item.serving_size}
          </Text>
        </View>
        <Pressable onPress={handlePress}>
          {isLoading ? (
            <ActivityIndicator size="small" color="#000000" />
          ) : (
            <AntDesign name="closecircleo" size={30} color="#000000" />
          )}
        </Pressable>
      </TouchableOpacity>
    <FoodItemModal bottomSheetModalRef={bottomSheetModalRef} snapPoints={snapPoints} />
    </>
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

import { TouchableOpacity, View, Text, Pressable, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import React, { useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { ActivityIndicator } from 'react-native-paper';

const SearchListItem = ({ item, onAdd }) => {
  const [borderColor, setBorderColor] = useState('transparent');
  const [isLoading, setIsLoading] = useState(false);

  const handleAddPress = () => {
    setIsLoading(true);
    setTimeout(async () => {
      await onAdd(item.food_name);
      console.log("item added");
      setIsLoading(false);
    }, 1000); // 1000 milliseconds (1 second) delay
  };

  return (
    <TouchableOpacity
      style={[styles.button, { borderColor }]}
      activeOpacity={0.7}
      testID="list-item"
    >
      <View style={{ flex: 1, gap: 5 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{item.food_name}</Text>
        <Text style={{ color: 'dimgray' }}>
          {item.serving_qty} {item.serving_unit}
        </Text>
      </View>
      <TouchableWithoutFeedback  testID="add-button" onPress={handleAddPress} >
        {isLoading ? (
          <ActivityIndicator size="small" color="#000000"/>
        ) : (
          <AntDesign name="pluscircleo" size={30} color="#000000"/>
        )}
      </TouchableWithoutFeedback>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'white',
    padding: 10,
    borderWidth: 2,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default SearchListItem;

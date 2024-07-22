import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useState } from 'react';
import { icons } from "../constants"

const FoodListItem = ({ item, onSelect }) => {

  const [borderColor, setBorderColor] = useState('transparent');
  const [selectIcon, setSelectIcon] = useState(icons.noSelect);
  

  const handlePress = () => {
    setBorderColor(borderColor === 'transparent' ? 'blue' : 'transparent')
    setSelectIcon(selectIcon === icons.noSelect ? icons.check : icons.noSelect);
    onSelect(item);
  };

  return (
      <TouchableOpacity
        testID='food-list-item'
        style={[styles.button, {borderColor}]}
        onPress={handlePress}
        activeOpacity={0.7}
      >
        <View style={{ flex: 1, gap: 5 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{item.food_name}</Text>
          <Text style={{ color: 'dimgray' }}>
            {item.nf_calories} kcal per serving
          </Text>
        </View>
        <Image source={selectIcon} className="h-[25px] w-[25px]"/>
      </TouchableOpacity>    
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'gainsboro',
    padding: 10,
    borderWidth: 2,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default FoodListItem;
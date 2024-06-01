import { View, Text, StyleSheet, TouchableOpacity, Image, Pressable} from 'react-native';
import { useState } from 'react';
import { icons } from "../constants"
import { FontAwesome5, AntDesign } from '@expo/vector-icons';

const FoodLogListItem = ({ item }) => {

    const [borderColor, setBorderColor] = useState('transparent');
    const [selectIcon, setSelectIcon] = useState(icons.noSelect);

    const handlePress = () => {
        setBorderColor(borderColor === 'transparent' ? 'green' : 'transparent')
        setSelectIcon(selectIcon === icons.noSelect ? icons.check : icons.noSelect);
    };
  
    return (
        <Pressable
          style={[styles.button, {borderColor}]}
          activeOpacity={0.7}
        >
          <View style={{ flex: 1, gap: 5 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{item.food_name}</Text>
            <Text style={{ color: 'dimgray' }}>
              {item.calories} kcal per serving
            </Text>
          </View>
          <Pressable
            onPress={handlePress}>
            <AntDesign name="closecircleo" size={30} color="#000000"></AntDesign>
          </Pressable>
          
        </Pressable>    
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
export default FoodLogListItem;
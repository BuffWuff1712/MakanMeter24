import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

  const data = [
    { label: 'Standard Serving', value: 0 },
    { label: 'Grams', value: 1 },
    { label: 'Ounces', value: 2 },
  ];

  const ServingTypes = () => {
    const [ servingType, setServingType ] = useState(0);

    return (
        
        <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            data={data}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Standard Serving"
            value={servingType}
            onChange={item => {
            setServingType(item.value);
            }}
            
        />
      
    );
  };

  export default ServingTypes;

  const styles = StyleSheet.create({
    dropdown: {
      flex: 1,
      padding: 25,
      marginLeft: 10,
      height: 70,
      width: 100,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: 'black',
    },
    placeholderStyle: {
      fontSize: 17,
    },
    selectedTextStyle: {
      fontSize: 17,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
  });
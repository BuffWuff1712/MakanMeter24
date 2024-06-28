import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import { View } from 'react-native';
import { useGlobalContext } from '../context/GlobalProvider';

  const data = [
    { label: 'Last 7 days', value: 0 },
    { label: 'Last 30 days', value: 1 },
  ];

  const TrendsDateRange = () => {
    const { period, setPeriod } = useGlobalContext();

    return (
        <View className="flex-auto flex-row w-[230px] left-5">
            <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={data}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Select"
                value={period}
                onChange={item => {
                setPeriod(item.value);
                }}
                renderLeftIcon={() => (
                <AntDesign style={styles.icon} color="black" name="calendar" size={20} />
                )}
            />
      </View>
    );
  };

  export default TrendsDateRange;

  const styles = StyleSheet.create({
    dropdown: {
      flex: 1,
      marginHorizontal: 40,
      height: 30,
      borderRadius: 5,
      borderBottomColor: 'gray',
      borderBottomWidth: 0.5,
    },
    icon: {
      marginRight: 5,
    },
    placeholderStyle: {
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 16,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
  });
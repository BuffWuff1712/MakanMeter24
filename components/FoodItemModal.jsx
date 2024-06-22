import 'react-native-gesture-handler';
import React, { useRef } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from 'react-native-paper';
import { BottomSheetModalProvider, BottomSheetModal } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';

// Sample Data
const headerData = [
  { name: 'Calories', value: 1000, unit: '' },
  { name: 'Carbs', value: 50, unit: 'g' },
  { name: 'Proteins', value: 30, unit: 'g' },
  { name: 'Fats', value: 10, unit: 'g' },
];

const nutritionFacts = [
  { name: 'Total fat', value: '4.0 g' },
  { name: 'Saturated fat', value: '0.5 g', bullet: true },
  { name: 'Polyunsaturated fat', value: '0.0 g', bullet: true },
  { name: 'Monounsaturated fat', value: '0.0 g', bullet: true },
  { name: 'Cholesterol', value: '25.0 mg' },
  { name: 'Sodium', value: '790.0 mg' },
  { name: 'Potassium', value: '590.0 mg' },
  { name: 'Total Carbohydrates', value: '41.0 g' },
  { name: 'Dietary Fiber', value: '2.0 g', bullet: true },
  { name: 'Sugars', value: '2.0 g', bullet: true },
  { name: 'Vitamin A', value: '25.0 mg' },
  { name: 'Vitamin C', value: '25.0 mg' },
  { name: 'Calcium', value: '25.0 mg' },
  { name: 'Iron', value: '25.0 mg' },
  { name: 'Vitamin D', value: '25.0 mg' },
  { name: 'Zinc', value: '25.0 mg' },
  { name: 'Vitamin B12', value: '25.0 mg' },
  { name: 'Magnesium', value: '25.0 mg' },
];

const FoodItemModal = ({ bottomSheetModalRef, snapPoints }) => {
  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      index={0}
      snapPoints={snapPoints}
      backgroundStyle={{ borderRadius: 50, backgroundColor: '#fff' }}
      onDismiss={() => console.log('modal dismissed')}
    >
      <SafeAreaView className="h-full">
        <ScrollView>
          <View className="flex-col bg-gray-100 h-[300px] justify-center px-5">
            <Text className="text-3xl font-bold py-3">Chicken Rice</Text>
            <Text className="text-xl">Rice Gourmet</Text>
            <View className="flex-row justify-evenly mt-20">
              {headerData.map((item, index) => (
                <View className="items-center" key={index}>
                  <Text className="text-2xl font-bold">
                    {item.value} {item.unit}
                  </Text>
                  <Text className="text-xl font-semibold">{item.name}</Text>
                </View>
              ))}
            </View>
          </View>
          <View className="p-7">
            <Text className="text-2xl font-bold mb-5">Serving size</Text>
            <View className="flex-row justify-between items-center">
              <TextInput
                className="text-xl border py-5 px-10 rounded-lg"
                defaultValue="1.0"
                keyboardType="numeric"
              />
              <View className="flex-row items-center border py-5 px-10 rounded-lg">
                <TextInput
                  className="text-xl"
                  defaultValue="cup(151.0g)"
                  keyboardType="numeric"
                />
                <AntDesign name="down" size={20} color="black" />
              </View>
            </View>
          </View>
          <View className="p-7">
            <Text className="text-2xl font-bold mb-5">Nutrition Quality</Text>
            <Text className="text-xl">Healthy if taken in moderation.</Text>
            <Text className="text-xl">
              Nutrient-packed but also contains trans fats, saturated fats, sugar, cholesterol, salt, etc.
            </Text>
            <View className="w-full items-center justify-center my-10">
              <Text className="text-lg font-semibold">Food Rating goes here</Text>
            </View>
          </View>
          <View className="p-7">
            <Text className="text-2xl font-bold mb-5">Food Features</Text>
            <Text className="text-xl">Features go here</Text>
          </View>
          <View className="p-0">
            <View className="px-7">
              <Text className="text-2xl font-bold mb-5">Nutrition Facts</Text>
            </View>
            {nutritionFacts.map((item, index) => {
              if (item.bullet) {
                return (
                  <View key={index} className="px-7 mb-2">
                    <View className="flex-row justify-between">
                      <Text className="text-xl text-green-500">•</Text>
                      <Text className="text-xl ml-2 color-zinc-600">{item.name}</Text>
                      <Text className="text-xl ml-auto color-zinc-600">{item.value}</Text>
                    </View>
                  </View>
                );
              } else {
                return (
                  <View key={index} className="border border-l-0 border-r-0 border-b-0 border-stone w-full px-7 py-5">
                    <View className="flex-row justify-between">
                      <Text className="text-xl font-bold color-zinc-600">{item.name}</Text>
                      <Text className="text-xl font-semibold color-zinc-600">{item.value}</Text>
                    </View>
                  </View>
                );
              }
            })}
          </View>
        </ScrollView>
      </SafeAreaView>
    </BottomSheetModal>
  );
};

export default FoodItemModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray',
    marginTop: -100,
    marginBottom: -30,
  },
});

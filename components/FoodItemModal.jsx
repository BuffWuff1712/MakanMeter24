import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import GradeBar from './GradeBar';
import ServingTypes from './ServingTypes';
import { updateMealItemQuantity } from '../lib/supabase';
import { useGlobalContext } from '../context/GlobalProvider';

const formatTo2DPOr2SF = (num) => {
  if (num >= 1000 || num <= 0.01) {
    return num.toPrecision(2);
  } else {
    return num.toFixed(2);
  }
};

const nutrientUnits = {
  fats: 'g',
  saturated_fat: 'g',
  polyunsaturated_fat: 'g',
  monounsaturated_fat: 'g',
  cholesterol: 'mg',
  sodium: 'mg',
  potassium: 'mg',
  carbohydrates: 'g',
  dietary_fiber: 'g',
  sugars: 'g',
  vitamin_a: 'IU',
  vitamin_c: 'mg',
  calcium: 'mg',
  iron: 'mg',
  vitamin_d: 'IU',
  zinc: 'mg',
  vitamin_b12: 'µg',
  magnesium: 'mg'
};

const FoodItemModal = ({ bottomSheetModalRef, snapPoints, item }) => {
  const { setRefresh } = useGlobalContext();
  const [quantity, setQuantity] = useState(item.quantity);

  const headerData = [
    { name: 'Calories', value: formatTo2DPOr2SF(item.calories * quantity) },
    { name: 'Carbs', value: formatTo2DPOr2SF(item.carbohydrates * quantity), unit: 'g' },
    { name: 'Proteins', value: formatTo2DPOr2SF(item.protein * quantity), unit: 'g' },
    { name: 'Fats', value: formatTo2DPOr2SF(item.fats * quantity), unit: 'g' },
  ];

  const nutritionFacts = [
    { name: 'Total fat', value: formatTo2DPOr2SF(item.fats * quantity), unit: nutrientUnits.fats },
    { name: 'Saturated fat', value: formatTo2DPOr2SF(item.saturated_fat * quantity), bullet: true, unit: nutrientUnits.saturated_fat },
    { name: 'Polyunsaturated fat', value: formatTo2DPOr2SF(item.polyunsaturated_fat * quantity), bullet: true, unit: nutrientUnits.polyunsaturated_fat },
    { name: 'Monounsaturated fat', value: formatTo2DPOr2SF(item.monounsaturated_fat * quantity), bullet: true, unit: nutrientUnits.monounsaturated_fat },
    { name: 'Cholesterol', value: formatTo2DPOr2SF(item.cholesterol * quantity), unit: nutrientUnits.cholesterol },
    { name: 'Sodium', value: formatTo2DPOr2SF(item.sodium * quantity), unit: nutrientUnits.sodium },
    { name: 'Potassium', value: formatTo2DPOr2SF(item.potassium * quantity), unit: nutrientUnits.potassium },
    { name: 'Total Carbohydrates', value: formatTo2DPOr2SF(item.carbohydrates * quantity), unit: nutrientUnits.carbohydrates },
    { name: 'Dietary Fiber', value: formatTo2DPOr2SF(item.dietary_fiber * quantity), bullet: true, unit: nutrientUnits.dietary_fiber },
    { name: 'Sugars', value: formatTo2DPOr2SF(item.sugars * quantity), bullet: true, unit: nutrientUnits.sugars },
    { name: 'Vitamin A', value: formatTo2DPOr2SF(item.vitamin_a * quantity), unit: nutrientUnits.vitamin_a },
    { name: 'Vitamin C', value: formatTo2DPOr2SF(item.vitamin_c * quantity), unit: nutrientUnits.vitamin_c },
    { name: 'Calcium', value: formatTo2DPOr2SF(item.calcium * quantity), unit: nutrientUnits.calcium },
    { name: 'Iron', value: formatTo2DPOr2SF(item.iron * quantity), unit: nutrientUnits.iron },
    { name: 'Vitamin D', value: formatTo2DPOr2SF(item.vitamin_d * quantity), unit: nutrientUnits.vitamin_d },
    { name: 'Zinc', value: formatTo2DPOr2SF(item.zinc * quantity), unit: nutrientUnits.zinc },
    { name: 'Vitamin B12', value: formatTo2DPOr2SF(item.vitamin_b12 * quantity), unit: nutrientUnits.vitamin_b12 },
    { name: 'Magnesium', value: formatTo2DPOr2SF(item.magnesium * quantity), unit: nutrientUnits.magnesium }
  ];

  const changeQuantity = async (newQuantity) => {
    // Skip if input is empty
    if (newQuantity === '') {
      return;
    }

    const parsedQuantity = parseFloat(newQuantity);
    if (isNaN(parsedQuantity) || parsedQuantity <= 0) {
      console.error(`Invalid quantity value: "${newQuantity}". Please enter a positive number.`);
      return;
    }

    try {
      await updateMealItemQuantity(item.meal_item_id, parsedQuantity);
      setQuantity(parsedQuantity);
      setRefresh((prev) => !prev);
    } catch (error) {
      console.error('Error updating meal item quantity:', error);
    }
  };

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      index={0}
      snapPoints={snapPoints}
      backgroundStyle={{ borderRadius: 20, backgroundColor: '#fff' }}
      onDismiss={() => console.log('modal dismissed')}
    >
      <BottomSheetScrollView>
        <View className="flex-col bg-emerald py-5 w-full justify-center px-3">
          <Text className="text-4xl font-bold color-white mt-5 px-3">{item.food_name}</Text>
          <View className="flex-row justify-evenly mt-10">
            {headerData.map((item, index) => (
              <View className="items-center" key={index}>
                <Text className="text-2xl font-bold color-white">
                  {item.value}{item.unit}
                </Text>
                <Text className="text-xl font-semibold color-white">{item.name}</Text>
              </View>
            ))}
          </View>
        </View>
        <View className="p-7">
          <Text className="text-2xl font-bold mb-5">Serving size</Text>
          <View className="flex-row justify-between items-center">
            <TextInput
              className="text-xl border py-5 px-10 rounded-lg w-[120px] justify-center"
              value={quantity.toString()}
              keyboardType="numeric"
              textAlign="center"
              onChangeText={(text) => setQuantity(text)}
              onBlur={() => changeQuantity(quantity)}
            />
            <ServingTypes />
          </View>
        </View>
        <View className="p-7">
          <Text className="text-2xl font-bold mb-5">Nutrition Quality</Text>
          <Text className="text-xl">Healthy if taken in moderation.</Text>
          <Text className="text-xl">
            Nutrient-packed but also contains trans fats, saturated fats, sugar, cholesterol, salt, etc.
          </Text>
          <View className="w-full items-center justify-center my-10">
            <GradeBar grade={'B'} />
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
                    <Text className="text-xl ml-auto color-zinc-600">{item.value} {item.unit}</Text>
                  </View>
                </View>
              );
            } else {
              return (
                <View key={index} className="border border-l-0 border-r-0 border-b-0 border-stone w-full px-7 py-5">
                  <View className="flex-row justify-between">
                    <Text className="text-xl font-bold color-zinc-600">{item.name}</Text>
                    <Text className="text-xl font-semibold color-zinc-600">{item.value} {item.unit}</Text>
                  </View>
                </View>
              );
            }
          })}
        </View>
      </BottomSheetScrollView>
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

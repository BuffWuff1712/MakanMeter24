import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import FoodListItem from '../../components/FoodListItem';
import CustomButton from '../../components/CustomButton';
const { fetchNutritionInfoForDishes } = require('../../lib/nutritionix.js');
import { addMeal, getMealsForDate, getTrackedMeals, } from '../../lib/supabase.js';
import { useGlobalContext } from '../../context/GlobalProvider.js';
import LoadingScreen from '../../components/LoadingScreen.jsx';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { Button } from 'react-native-paper';

const Results = () => {
  const { meal_type } = useLocalSearchParams();
  const { user, setTrackedMeals, setMealsData, selectedDate, setRefresh} = useGlobalContext();
  const [foodItems, setFoodItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingContext, setLoadingContext] = useState('analyzing'); // New state variable
  const [error, setError] = useState(null);
  const { data } = useLocalSearchParams();

  // DO NOT USE UNTIL APP HAS BEEN FINALISED - REQUEST TO FOOD DATABASE API
  useEffect(() => {
    //Fetches data of the food items from the foodbase API
    const fetchData = async () => {
      try {
        const jsonData = JSON.parse(data);
        const dishes = jsonData.possible_dish_names;
        const foodItemsArray = await fetchNutritionInfoForDishes(dishes);
            
        setFoodItems(foodItemsArray);
      } catch (error) {
        console.error('Error fetching nutrition info:', error.message);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [data]);

  // // FOR DUMMY API REQUEST- contains DUMMY FOOD INFO
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const jsonData = JSON.parse(data);
  //       const ingredients = jsonData.ingredients;
  //       const foodItemsArray = [
  //         {
  //           "alt_measures": [
  //             {
  //               "measure": "serving",
  //               "qty": 1,
  //               "seq": 1,
  //               "serving_weight": 543.14
  //             },
  //             {
  //               "measure": "cup",
  //               "qty": 1,
  //               "seq": 2,
  //               "serving_weight": 244
  //             },
  //             {
  //               "measure": "bowl (2 cups)",
  //               "qty": 1,
  //               "seq": 3,
  //               "serving_weight": 488
  //             },
  //             {
  //               "measure": "fl oz",
  //               "qty": 1,
  //               "seq": 4,
  //               "serving_weight": 30.5
  //             },
  //             {
  //               "measure": "g",
  //               "qty": 100,
  //               "seq": null,
  //               "serving_weight": 100
  //             },
  //             {
  //               "measure": "tsp",
  //               "qty": 1,
  //               "seq": 101,
  //               "serving_weight": 5.08
  //             },
  //             {
  //               "measure": "tbsp",
  //               "qty": 1,
  //               "seq": 102,
  //               "serving_weight": 15.25
  //             }
  //           ],
  //           "brand_name": null,
  //           "brick_code": null,
  //           "class_code": null,
  //           "consumed_at": "2024-06-21T10:27:07+00:00",
  //           "food_name": "test_item_1",
  //           "full_nutrients": [
  //             {
  //               "attr_id": 203,
  //               "value": 23.3662
  //             },
  //             {
  //               "attr_id": 204,
  //               "value": 31.4559
  //             },
  //             {
  //               "attr_id": 205,
  //               "value": 64.0746
  //             },
  //             {
  //               "attr_id": 207,
  //               "value": 9.4465
  //             },
  //             {
  //               "attr_id": 208,
  //               "value": 613.329
  //             },
  //             {
  //               "attr_id": 210,
  //               "value": 1.5101
  //             },
  //             {
  //               "attr_id": 211,
  //               "value": 0.0237
  //             },
  //             {
  //               "attr_id": 212,
  //               "value": 0.023
  //             },
  //             {
  //               "attr_id": 213,
  //               "value": 0
  //             },
  //             {
  //               "attr_id": 214,
  //               "value": 0
  //             },
  //             {
  //               "attr_id": 221,
  //               "value": 0
  //             },
  //             {
  //               "attr_id": 255,
  //               "value": 360.0087
  //             },
  //             {
  //               "attr_id": 262,
  //               "value": 0
  //             },
  //             {
  //               "attr_id": 263,
  //               "value": 0
  //             },
  //             {
  //               "attr_id": 268,
  //               "value": 2566.7223
  //             },
  //             {
  //               "attr_id": 269,
  //               "value": 16.6186
  //             },
  //             {
  //               "attr_id": 287,
  //               "value": 0.003
  //             },
  //             {
  //               "attr_id": 291,
  //               "value": 4.173
  //             },
  //             {
  //               "attr_id": 301,
  //               "value": 98.1039
  //             },
  //             {
  //               "attr_id": 303,
  //               "value": 5.7512
  //             },
  //             {
  //               "attr_id": 304,
  //               "value": 98.2067
  //             },
  //             {
  //               "attr_id": 305,
  //               "value": 338.8212
  //             },
  //             {
  //               "attr_id": 306,
  //               "value": 836.2851
  //             },
  //             {
  //               "attr_id": 307,
  //               "value": 2456.3222
  //             },
  //             {
  //               "attr_id": 309,
  //               "value": 2.5037
  //             },
  //             {
  //               "attr_id": 312,
  //               "value": 0.4665
  //             },
  //             {
  //               "attr_id": 313,
  //               "value": 0.2245
  //             },
  //             {
  //               "attr_id": 315,
  //               "value": 2.2736
  //             },
  //             {
  //               "attr_id": 317,
  //               "value": 27.0361
  //             },
  //             {
  //               "attr_id": 318,
  //               "value": 623.628
  //             },
  //             {
  //               "attr_id": 319,
  //               "value": 10.5126
  //             },
  //             {
  //               "attr_id": 320,
  //               "value": 40.2185
  //             },
  //             {
  //               "attr_id": 321,
  //               "value": 331.6733
  //             },
  //             {
  //               "attr_id": 322,
  //               "value": 19.9324
  //             },
  //             {
  //               "attr_id": 323,
  //               "value": 1.6483
  //             },
  //             {
  //               "attr_id": 324,
  //               "value": 8.4443
  //             },
  //             {
  //               "attr_id": 326,
  //               "value": 0.181
  //             },
  //             {
  //               "attr_id": 328,
  //               "value": 0.181
  //             },
  //             {
  //               "attr_id": 334,
  //               "value": 24.8206
  //             },
  //             {
  //               "attr_id": 337,
  //               "value": 829.4311
  //             },
  //             {
  //               "attr_id": 338,
  //               "value": 405.3537
  //             },
  //             {
  //               "attr_id": 341,
  //               "value": 0
  //             },
  //             {
  //               "attr_id": 342,
  //               "value": 0.1829
  //             },
  //             {
  //               "attr_id": 343,
  //               "value": 0.0012
  //             },
  //             {
  //               "attr_id": 344,
  //               "value": 0.0102
  //             },
  //             {
  //               "attr_id": 345,
  //               "value": 0
  //             },
  //             {
  //               "attr_id": 346,
  //               "value": 0.0483
  //             },
  //             {
  //               "attr_id": 347,
  //               "value": 0
  //             },
  //             {
  //               "attr_id": 401,
  //               "value": 78.046
  //             },
  //             {
  //               "attr_id": 404,
  //               "value": 0.163
  //             },
  //             {
  //               "attr_id": 405,
  //               "value": 0.2786
  //             },
  //             {
  //               "attr_id": 406,
  //               "value": 6.5402
  //             },
  //             {
  //               "attr_id": 410,
  //               "value": 1.0901
  //             },
  //             {
  //               "attr_id": 415,
  //               "value": 0.6548
  //             },
  //             {
  //               "attr_id": 417,
  //               "value": 51.7641
  //             },
  //             {
  //               "attr_id": 418,
  //               "value": 0.3819
  //             },
  //             {
  //               "attr_id": 421,
  //               "value": 83.2325
  //             },
  //             {
  //               "attr_id": 428,
  //               "value": 7.9014
  //             },
  //             {
  //               "attr_id": 429,
  //               "value": 0
  //             },
  //             {
  //               "attr_id": 430,
  //               "value": 34.9529
  //             },
  //             {
  //               "attr_id": 431,
  //               "value": 0
  //             },
  //             {
  //               "attr_id": 432,
  //               "value": 51.7641
  //             },
  //             {
  //               "attr_id": 435,
  //               "value": 51.7641
  //             },
  //             {
  //               "attr_id": 454,
  //               "value": 9.3224
  //             },
  //             {
  //               "attr_id": 501,
  //               "value": 0.2043
  //             },
  //             {
  //               "attr_id": 502,
  //               "value": 0.7623
  //             },
  //             {
  //               "attr_id": 503,
  //               "value": 0.7963
  //             },
  //             {
  //               "attr_id": 504,
  //               "value": 1.4224
  //             },
  //             {
  //               "attr_id": 505,
  //               "value": 1.3516
  //             },
  //             {
  //               "attr_id": 506,
  //               "value": 0.4426
  //             },
  //             {
  //               "attr_id": 507,
  //               "value": 0.2307
  //             },
  //             {
  //               "attr_id": 508,
  //               "value": 0.7416
  //             },
  //             {
  //               "attr_id": 509,
  //               "value": 0.6589
  //             },
  //             {
  //               "attr_id": 510,
  //               "value": 0.8908
  //             },
  //             {
  //               "attr_id": 511,
  //               "value": 1.3818
  //             },
  //             {
  //               "attr_id": 512,
  //               "value": 0.4856
  //             },
  //             {
  //               "attr_id": 513,
  //               "value": 0.9927
  //             },
  //             {
  //               "attr_id": 514,
  //               "value": 1.8121
  //             },
  //             {
  //               "attr_id": 515,
  //               "value": 2.9494
  //             },
  //             {
  //               "attr_id": 516,
  //               "value": 0.7884
  //             },
  //             {
  //               "attr_id": 517,
  //               "value": 0.7285
  //             },
  //             {
  //               "attr_id": 518,
  //               "value": 0.7586
  //             },
  //             {
  //               "attr_id": 521,
  //               "value": 0
  //             },
  //             {
  //               "attr_id": 601,
  //               "value": 77.2049
  //             },
  //             {
  //               "attr_id": 605,
  //               "value": 0.2477
  //             },
  //             {
  //               "attr_id": 606,
  //               "value": 16.2011
  //             },
  //             {
  //               "attr_id": 607,
  //               "value": 0
  //             },
  //             {
  //               "attr_id": 608,
  //               "value": 0.0831
  //             },
  //             {
  //               "attr_id": 609,
  //               "value": 1.0259
  //             },
  //             {
  //               "attr_id": 610,
  //               "value": 0.8199
  //             },
  //             {
  //               "attr_id": 611,
  //               "value": 6.4942
  //             },
  //             {
  //               "attr_id": 612,
  //               "value": 2.62
  //             },
  //             {
  //               "attr_id": 613,
  //               "value": 3.6034
  //             },
  //             {
  //               "attr_id": 614,
  //               "value": 1.4951
  //             },
  //             {
  //               "attr_id": 615,
  //               "value": 0.0131
  //             },
  //             {
  //               "attr_id": 617,
  //               "value": 5.9026
  //             },
  //             {
  //               "attr_id": 618,
  //               "value": 6.4195
  //             },
  //             {
  //               "attr_id": 619,
  //               "value": 0.6655
  //             },
  //             {
  //               "attr_id": 620,
  //               "value": 0.0673
  //             },
  //             {
  //               "attr_id": 621,
  //               "value": 0.0044
  //             },
  //             {
  //               "attr_id": 624,
  //               "value": 0.0122
  //             },
  //             {
  //               "attr_id": 625,
  //               "value": 0.0184
  //             },
  //             {
  //               "attr_id": 626,
  //               "value": 0.5704
  //             },
  //             {
  //               "attr_id": 627,
  //               "value": 0.0024
  //             },
  //             {
  //               "attr_id": 628,
  //               "value": 0.0599
  //             },
  //             {
  //               "attr_id": 629,
  //               "value": 0.0032
  //             },
  //             {
  //               "attr_id": 630,
  //               "value": 0.0021
  //             },
  //             {
  //               "attr_id": 631,
  //               "value": 0.0094
  //             },
  //             {
  //               "attr_id": 636,
  //               "value": 24.9975
  //             },
  //             {
  //               "attr_id": 638,
  //               "value": 0.0457
  //             },
  //             {
  //               "attr_id": 639,
  //               "value": 0.0173
  //             },
  //             {
  //               "attr_id": 641,
  //               "value": 0.088
  //             },
  //             {
  //               "attr_id": 645,
  //               "value": 6.5629
  //             },
  //             {
  //               "attr_id": 646,
  //               "value": 7.2241
  //             },
  //             {
  //               "attr_id": 652,
  //               "value": 0.0075
  //             },
  //             {
  //               "attr_id": 653,
  //               "value": 0.012
  //             },
  //             {
  //               "attr_id": 654,
  //               "value": 0.0092
  //             },
  //             {
  //               "attr_id": 663,
  //               "value": 0.0032
  //             },
  //             {
  //               "attr_id": 670,
  //               "value": 0.0009
  //             },
  //             {
  //               "attr_id": 671,
  //               "value": 0.0012
  //             },
  //             {
  //               "attr_id": 672,
  //               "value": 0.0129
  //             },
  //             {
  //               "attr_id": 673,
  //               "value": 0.0004
  //             },
  //             {
  //               "attr_id": 674,
  //               "value": 1.6825
  //             },
  //             {
  //               "attr_id": 675,
  //               "value": 4.1884
  //             },
  //             {
  //               "attr_id": 676,
  //               "value": 0.0003
  //             },
  //             {
  //               "attr_id": 685,
  //               "value": 0.0001
  //             },
  //             {
  //               "attr_id": 687,
  //               "value": 0.0081
  //             },
  //             {
  //               "attr_id": 689,
  //               "value": 0.0226
  //             },
  //             {
  //               "attr_id": 693,
  //               "value": 0.0032
  //             },
  //             {
  //               "attr_id": 695,
  //               "value": 0.1896
  //             },
  //             {
  //               "attr_id": 696,
  //               "value": 0
  //             },
  //             {
  //               "attr_id": 697,
  //               "value": 0
  //             },
  //             {
  //               "attr_id": 851,
  //               "value": 0.4466
  //             },
  //             {
  //               "attr_id": 853,
  //               "value": 0.0001
  //             },
  //             {
  //               "attr_id": 858,
  //               "value": 0.0172
  //             }
  //           ],
  //           "lat": null,
  //           "lng": null,
  //           "meal_type": 1,
  //           "metadata": {
  //             "is_raw_food": false
  //           },
  //           "ndb_no": 1001205,
  //           "nf_calories": 613.33,
  //           "nf_cholesterol": 77.2,
  //           "nf_dietary_fiber": 4.17,
  //           "nf_p": 338.82,
  //           "nf_potassium": 836.29,
  //           "nf_protein": 23.37,
  //           "nf_saturated_fat": 16.2,
  //           "nf_sodium": 2456.32,
  //           "nf_sugars": 16.62,
  //           "nf_total_carbohydrate": 64.07,
  //           "nf_total_fat": 31.46,
  //           "nix_brand_id": null,
  //           "nix_brand_name": null,
  //           "nix_item_id": null,
  //           "nix_item_name": null,
  //           "photo": {
  //             "highres": "https://nix-tag-images.s3.a mazonaws.com/3788_highres.jpg",
  //             "is_user_uploaded": false,
  //             "thumb": "https://nix-tag-images.s3.amazonaws.com/3788_thumb.jpg"
  //           },
  //           "serving_qty": 1,
  //           "serving_unit": "bowl (2 cups)",
  //           "serving_weight_grams": 488,
  //           "source": 1,
  //           "sub_recipe": null,
  //           "tag_id": null,
  //           "tags": {
  //             "food_group": 0,
  //             "item": "laksa",
  //             "measure": null,
  //             "quantity": "1.0",
  //             "tag_id": 3788
  //           },
  //           "upc": null
  //         },
  //         { nf_calories: 71, food_name: 'Test_item_2', nf_total_carbohydrate: 0.91, nf_total_fat: 1.01, nf_dietary_fiber: 0, nf_protein: 13.6, saturated_fat: 6.97, polyunsaturated_fat: 8.01, monounsaturated_fat: 3.19, cholesterol: 66.19, sodium: 2205.28, potassium: 1629.53, sugars: 35.02, vitamin_a: 179.83, vitamin_c: 65.1, vitamin_d: 1.85, calcium: 222.63, iron: 17.54, zinc: 4.54, vitamin_b12: 0.74, magnesium: 199.06, serving_qty: 1 },
  //         { nf_calories: 92, food_name: 'Test_item_3', nf_total_carbohydrate: 3.08, nf_total_fat: 1.38, nf_dietary_fiber: 0, nf_protein: 15.6, saturated_fat: 1.48, polyunsaturated_fat: 9.47, monounsaturated_fat: 5.76, cholesterol: 263.79, sodium: 185, potassium: 3119.08, sugars: 12.12, vitamin_a: 183.93, vitamin_c: 26.84, vitamin_d: 8.68, calcium: 834.85, iron: 6, zinc: 8.17, vitamin_b12: 0.33, magnesium: 394.32, serving_qty: 1 },
  //         { nf_calories: 32, food_name: 'Test_item_4', nf_total_carbohydrate: 7.34, nf_total_fat: 0.19, nf_dietary_fiber: 2.6, nf_protein: 1.83, saturated_fat: 3.51, polyunsaturated_fat: 0.24, monounsaturated_fat: 7.94, cholesterol: 165.51, sodium: 41.24, potassium: 3746.35, sugars: 21.14, vitamin_a: 364.12, vitamin_c: 52.88, vitamin_d: 1.94, calcium: 473.22, iron: 17.08, zinc: 7.4, vitamin_b12: 1.67, magnesium: 40.18, serving_qty: 1 },
  //         { nf_calories: 30, food_name: 'Test_item_5', nf_total_carbohydrate: 5.94, nf_total_fat: 0.18, nf_dietary_fiber: 1.8, nf_protein: 3.04, saturated_fat: 4.65, polyunsaturated_fat: 6.74, monounsaturated_fat: 9.29, cholesterol: 154.71, sodium: 1094.52, potassium: 1452.96, sugars: 0.78, vitamin_a: 890.19, vitamin_c: 72.91, vitamin_d: 18.09, calcium: 858.64, iron: 12.14, zinc: 7.15, vitamin_b12: 1.89, magnesium: 393.26, serving_qty: 1 },
  //         { nf_calories: 30, food_name: 'Test_item_6', nf_total_carbohydrate: 10.5, nf_total_fat: 0.2, nf_dietary_fiber: 2.8, nf_protein: 0.7, saturated_fat: 7.05, polyunsaturated_fat: 6.14, monounsaturated_fat: 3.39, cholesterol: 202.64, sodium: 758.84, potassium: 667.49, sugars: 34.84, vitamin_a: 206.9, vitamin_c: 2.8, vitamin_d: 14.18, calcium: 555.53, iron: 13.2, zinc: 9.31, vitamin_b12: 0.78, magnesium: 132.04, serving_qty: 1 },
  //         { nf_calories: 40, food_name: 'Test_item_7', nf_total_carbohydrate: 8.81, nf_total_fat: 0.44, nf_dietary_fiber: 1.5, nf_protein: 1.87, saturated_fat: 1.68, polyunsaturated_fat: 9.99, monounsaturated_fat: 5.66, cholesterol: 34.6, sodium: 1073.33, potassium: 178.51, sugars: 2.06, vitamin_a: 96.96, vitamin_c: 60.9, vitamin_d: 10.66, calcium: 1217.42, iron: 0.33, zinc: 1.2, vitamin_b12: 1.5, magnesium: 393.63, serving_qty: 1 },
  //         { nf_calories: 149, food_name: 'Test_item_8', nf_total_carbohydrate: 33.1, nf_total_fat: 0.5, nf_dietary_fiber: 2.1, nf_protein: 6.36, saturated_fat: 6.89, polyunsaturated_fat: 5.31, monounsaturated_fat: 9.84, cholesterol: 40.43, sodium: 1878.54, potassium: 2445.09, sugars: 14.77, vitamin_a: 826.7, vitamin_c: 0.6, vitamin_d: 8.74, calcium: 432.87, iron: 1.57, zinc: 7.22, vitamin_b12: 0.75, magnesium: 264.12, serving_qty: 1 },
  //         { nf_calories: 53, food_name: 'Test_item_9', nf_total_carbohydrate: 4.93, nf_total_fat: 0.57, nf_dietary_fiber: 0.8, nf_protein: 8.14, saturated_fat: 8.99, polyunsaturated_fat: 0.8, monounsaturated_fat: 2.58, cholesterol: 276.2, sodium: 1099.75, potassium: 1589.56, sugars: 35.07, vitamin_a: 136.65, vitamin_c: 56.33, vitamin_d: 15.6, calcium: 1207.51, iron: 15.6, zinc: 0.9, vitamin_b12: 0.59, magnesium: 66.78, serving_qty: 1 },
  //         { nf_calories: 884, food_name: 'Test_item_10', nf_total_carbohydrate: 0, nf_total_fat: 100, nf_dietary_fiber: 0, nf_protein: 0, saturated_fat: 2.63, polyunsaturated_fat: 6.74, monounsaturated_fat: 8.82, cholesterol: 251.56, sodium: 1881.87, potassium: 1284.34, sugars: 25.59, vitamin_a: 170.93, vitamin_c: 77.91, vitamin_d: 3.43, calcium: 905.62, iron: 16.69, zinc: 1.88, vitamin_b12: 1.01, magnesium: 387.74, serving_qty: 1 }
  //       ];        
  //       setFoodItems(foodItemsArray);
  //     } catch (error) {
  //       console.error('Error fetching nutrition info:', error.message);
  //       setError(error.message);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, [data]);

  const handleSelectItem = (item) => {
    setSelectedItems((prevSelectedItems) => {
      if (prevSelectedItems.includes(item)) {
        return prevSelectedItems.filter((i) => i !== item);
      } else {
        return [...prevSelectedItems, item];
      }
    });
  };

  const handleAddButtonPress = async () => {
    if (selectedItems.length > 0) {
      setIsLoading(true);
      setLoadingContext('adding');
      try {
        const meal_id = await addMeal(selectedItems, meal_type, selectedDate);
        const updatedTrackedMeals = await getTrackedMeals(meal_id);
        const mealsData = await getMealsForDate(user, selectedDate);
  
        setRefresh((prev) => !prev);
        setTrackedMeals(updatedTrackedMeals);
        setMealsData(mealsData);

        router.navigate({
          pathname: 'log_page',
          params: { meal_type }, // Pass the tracked meals data
        });
      } catch (error) {
        console.error('Error adding meal:', error);
        Alert.alert('Error', 'Failed to add meal. Please try again.');
      } finally {
        setIsLoading(false); // Set loading state to false
      }
    } else {
      Alert.alert('No items selected', 'Please select at least one item to add.');
    }
  };
  
  const goBack = () => {
    router.back();
  };

  const renderLoadingScreen = () => {
    return (
      <View style={styles.loadingContainer}>
        {loadingContext === 'analyzing' ? (
          <LoadingScreen text={'Analysing Ingredients'}/>
        ) : (
          <LoadingScreen text={'Adding Ingredients'}/>
        )}
      </View>
    );
  };

  const searchForMoreButton = () => {
    return (
      <View className="mt-3 items-center">
        <View className="w-[200px]">
        <Button 
          mode="outlined"
          icon={() => <FontAwesome name="search" size={15} color="#1434A4" />}
          compact={true} 
          contentStyle={{flexDirection: 'row'}}
          labelStyle={{color:"#1434A4"}}
          onPress={() => console.log('Pressed')}
        >
          Search For More     
        </Button>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.flexContainer}>
      {isLoading ? (
        renderLoadingScreen()
      ) : (
        <SafeAreaView className="bg-white h-full">
          <View className="flex-1 p-4 bg-white">
            <View className="my-5 mx-3 items-center justify-between flex-row">
              <TouchableOpacity onPress={goBack}>
                <FontAwesome5 name="arrow-left" size={24} color="black" />
              </TouchableOpacity>
              <Text className="text-xl font-semibold">Scan a Meal</Text>
              <View></View>
            </View>
          <FlatList
            data={foodItems}
            renderItem={({ item }) => <FoodListItem item={item} onSelect={handleSelectItem} />}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{ gap: 5 }}
            className="my-5"
            ListFooterComponent={searchForMoreButton}
          />
          <View style={styles.buttonContainer}>
            <CustomButton
              title={selectedItems.length > 0 ? `ADD (${selectedItems.length} items)`:"ADD"}
              containerStyles={selectedItems.length > 0 ? "bg-emerald" : "bg-gray-100"}
              handlePress={handleAddButtonPress}
            />
          </View>
          </View>
        </SafeAreaView>
        
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 10,
    marginBottom: 10,
    justifyContent: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
    color: '#000',
  },
});

export default Results;

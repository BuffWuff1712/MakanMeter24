import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import FilledBarSeparator from '../components/FilledBarSeparator';
import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useGlobalContext } from '../context/GlobalProvider';
import { getDate } from '../lib/supabase';

const MealListItem = ({ item }) => {
    const { selectedDate } = useGlobalContext();
    const router = useRouter();
    const handlePress = (mealType) => {
      console.log(mealType);
        router.navigate({
          pathname: 'log_page',
          params: { meal_type: mealType, date: getDate(selectedDate) },
    })};

    const displayedItems = item.data.slice(0, 4);

    return (
        <TouchableOpacity
          style={styles.card}
          activeOpacity={0.7}
          onPress={() => handlePress(item.mealType)}
        >
          <View style={styles.row}>
            <Image source={item.icon} className="h-[45px] w-[45px]" />
            <View style={styles.info}>
                <Text style={styles.mealType}>{item.mealType}</Text>
                <View style={styles.foodItemsContainer}>
                  {item.data.length > 0 ? (
                    displayedItems.map((foodItem, index) => (
                      <Text key={index} style={styles.foodName}>
                        {foodItem.food_item.food_name}
                        {index < item.data.length - 1 ? ',' : ''}
                      </Text>
                    ))
                  ) : (
                    <Text style={styles.recommendedText}>Recommended portion</Text>
                  )}
                </View>
            </View>
            <TouchableOpacity
                onPress={() => handlePress(item.mealType)}
                style={styles.iconContainer}
            >
                <AntDesign name="pluscircleo" size={30} color="#000000" />
            </TouchableOpacity>
          </View>
          {item.data.length > 0 ? (
            <View className='items-center'>
              <FilledBarSeparator/>
              <Text>{item.calories} cal</Text>
            </View>) : <></>}
          
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginVertical: 5,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
    alignItems: 'center'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  info: {
    flex: 1,
    marginLeft: 10,
  },
  mealType: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  recommendedCalories: {
    color: 'dimgray',
  },
  iconContainer: {
    marginLeft: 10,
  },
  foodItemsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  foodName: {
    fontSize: 16,
    marginHorizontal: 2,
  },
  recommendedText: {
    fontSize: 16,
    color: 'dimgray',
  },
});

export default MealListItem;

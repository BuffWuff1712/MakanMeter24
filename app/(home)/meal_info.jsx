import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Dimensions, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { PieChart } from 'react-native-chart-kit';
import { useLocalSearchParams, useRouter } from 'expo-router';
import FoodLogListItem from '../../components/FoodLogListItem';
import { calculateTotals, deleteMealItem, getDate, getOrCreateAndFetchMeals} from '../../lib/supabase';
import { useGlobalContext } from '../../context/GlobalProvider';

const MealInfoPage = () => {
    const { meal_type } = useLocalSearchParams();
    const { user, selectedDate, refresh, setRefresh } = useGlobalContext();
    const [data, setData] = useState([]);
    const [macros, setMacros] = useState(null);
    const router = useRouter();
    const screenWidth = Dimensions.get('window').width;
    const parts = selectedDate.toDateString().split(' ');
    const formattedDate = `${parts[2]} ${parts[1]}`;

    useEffect(() => {
        const fetchMealInfo = async () => {
            try {
                const data = await getOrCreateAndFetchMeals(user, meal_type, selectedDate);
                setData(data ? data : []);
                setMacros(calculateTotals(data ? data : []));
            } catch (error) {
                console.error('Error fetching meal info:', error);
            }
        };

        fetchMealInfo();
    }, [refresh, selectedDate, meal_type, user]);

    const handlePress = (mealType) => {
        router.replace({
            pathname: 'log_page',
            params: { meal_type: mealType, date: getDate(selectedDate) },
        });
    };

    const handleDelete = async (mealItemId) => {
        try {
            await deleteMealItem(mealItemId);
            // Trigger a refresh
            setRefresh((prev) => !prev);
        } catch (error) {
            console.error('Error deleting meal item:', error);
        }
    };

    const roundToOneDecimal = (value) => {
        return parseFloat(value).toFixed(1);
    };

    const renderHeader = () => (
        <View>
            <Text className="text-4xl mt-10">{meal_type} - {formattedDate}</Text>
            <View style={styles.nutritionSection}>
                <Text style={styles.sectionTitle}>Nutritional Information</Text>
                <PieChart
                    data={[
                        {
                            name: 'Carbs',
                            population: parseFloat(roundToOneDecimal(macros?.totalCarbohydrates || 0)),
                            color: '#f39c12',
                            legendFontColor: '#7F7F7F',
                            legendFontSize: 15,
                        },
                        {
                            name: 'Protein',
                            population: parseFloat(roundToOneDecimal(macros?.totalProtein || 0)),
                            color: '#27ae60',
                            legendFontColor: '#7F7F7F',
                            legendFontSize: 15,
                        },
                        {
                            name: 'Fat',
                            population: parseFloat(roundToOneDecimal(macros?.totalFats || 0)),
                            color: '#c0392b',
                            legendFontColor: '#7F7F7F',
                            legendFontSize: 15,
                        },
                    ]}
                    width={screenWidth - 40}
                    height={220}
                    chartConfig={{
                        backgroundColor: '#1cc910',
                        backgroundGradientFrom: '#eff3ff',
                        backgroundGradientTo: '#efefef',
                        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    }}
                    accessor="population"
                    backgroundColor="transparent"
                    paddingLeft="15"
                    center={[10, 0]}
                    absolute
                />
                <View style={styles.nutritionItem}>
                    <Text style={styles.nutritionLabel}>Calories:</Text>
                    <Text style={styles.nutritionValue}>{roundToOneDecimal(macros?.totalCalories || 0)} kcal</Text>
                </View>
                <View style={styles.nutritionItem}>
                    <Text style={styles.nutritionLabel}>Carbs:</Text>
                    <Text style={styles.nutritionValue}>{roundToOneDecimal(macros?.totalCarbohydrates || 0)} g</Text>
                </View>
                <View style={styles.nutritionItem}>
                    <Text style={styles.nutritionLabel}>Protein:</Text>
                    <Text style={styles.nutritionValue}>{roundToOneDecimal(macros?.totalProtein || 0)} g</Text>
                </View>
                <View style={styles.nutritionItem}>
                    <Text style={styles.nutritionLabel}>Fat:</Text>
                    <Text style={styles.nutritionValue}>{roundToOneDecimal(macros?.totalFats || 0)} g</Text>
                </View>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.headerContainer}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
                        <Icon name="arrow-back" size={24} color="#000" />
                    </TouchableOpacity>
                    <Text style={styles.title}>{meal_type}</Text>
                    <View style={styles.headerIcons}>
                        <TouchableOpacity onPress={() => alert('Share')} style={styles.iconButton}>
                            <Icon name="share-social" size={24} color="#000" style={styles.icon} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => alert('Like')} style={styles.iconButton}>
                            <Icon name="heart" size={24} color="#000" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={styles.contentContainer}>
                <FlatList
                    data={data}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => <FoodLogListItem item={item} onDelete={handleDelete} />}
                    ListHeaderComponent={renderHeader}
                    contentContainerStyle={styles.listContainer}
                />
            </View>
            <TouchableOpacity style={styles.addButton} onPress={() => handlePress(meal_type)}>
                <Text style={styles.addButtonText}>Add More Food</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f0f4f7',
        marginTop: -58,
    },
    contentContainer: {
        flex: 1,
    },
    listContainer: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    headerContainer: {
        alignItems: 'center',
        paddingVertical: 30,
        paddingBottom: 35,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 10,
        elevation: 5,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
        top: 25,
        left: 0,
        right: 0,
    },
    iconButton: {
        padding: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'center',
    },
    headerIcons: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        marginHorizontal: 10,
    },
    nutritionSection: {
        backgroundColor: '#fff',
        marginTop: 30,
        borderRadius: 10,
        padding: 15,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 10,
        elevation: 5,
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    nutritionItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 5,
    },
    nutritionLabel: {
        fontSize: 14,
        color: '#333',
    },
    nutritionValue: {
        fontSize: 14,
        color: '#333',
    },
    addButton: {
        backgroundColor: '#10b981',
        borderRadius: 10,
        paddingVertical: 15,
        paddingHorizontal: 20,
        alignItems: 'center',
        marginHorizontal: 20,
        marginVertical: 10,
    },
    addButtonText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default MealInfoPage;



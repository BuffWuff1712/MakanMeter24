import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router, useLocalSearchParams } from 'expo-router';

const CategorySelection = () => {

    const { categoriesList } = useLocalSearchParams();
    const parsedCategories = JSON.parse(categoriesList);

        const handleCategorySelect = (category) => {
            router.navigate({pathname:'options', params: {category: JSON.stringify(category)} })
        }

    return (
        <SafeAreaView className='h-full'>
            <View style={styles.container}>
                <Text style={styles.title}>Choose a Category</Text>
                {parsedCategories.map((category) => (
                    <TouchableOpacity
                    key={category.id}
                    style={styles.categoryButton}
                    onPress={() => handleCategorySelect(category)}
                    >
                    <Text style={styles.categoryButtonText}>{category.title}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 20,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
    },
    categoryButton: {
      backgroundColor: '#f0f0f0',
      padding: 15,
      marginVertical: 5,
      borderRadius: 5,
    },
    categoryButtonText: {
      fontSize: 16,
      textAlign: 'center',
    },
  });
  
  export default CategorySelection;
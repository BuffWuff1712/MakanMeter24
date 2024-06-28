import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGlobalContext } from '../../context/GlobalProvider';

const OptionsSelection = () => {
    const { category } = useLocalSearchParams();
    const { setCurrentPlan } = useGlobalContext();
    const parsedCategory = JSON.parse(category);

    const handleOptionsSelect = (item) => {
        console.log(item);
        setCurrentPlan({
            name: item.name,
            description: item.description,
            // Add other properties as needed based on your data structure
        })
        router.navigate('plan');
    };

    return (
        <SafeAreaView className='h-full'>
            <View style={styles.container}>
                <Text style={styles.title}>Choose an Option</Text>
                {parsedCategory.data.map((item) => (
                    <TouchableOpacity
                    key={item.id}
                    style={styles.categoryButton}
                    onPress={() => handleOptionsSelect(item)}
                    >
                    <Text style={styles.categoryButtonText}>{item.description}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </SafeAreaView>
        
    );
};

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

export default OptionsSelection;

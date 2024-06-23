import React, { useState } from 'react';
import { View, TextInput, FlatList, TouchableOpacity, StyleSheet, Keyboard, Text} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { fetchNutritionInfo, fetchSuggestions } from '../lib/nutritionix'; // Adjust the import path if needed
import SearchListItem from './SearchListItem';
import { addMeal } from '../lib/supabase';
import { useGlobalContext } from '../context/GlobalProvider';

const AutoCompleteSearchBar = ({ trackedMeals, meal_type }) => {

    const { setRefresh, selectedDate } = useGlobalContext();
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [results, setResults] = useState([]);
    const [isFocused, setIsFocused] = useState(false);

    const handleSearchChange = async (text) => {
        setQuery(text);
        if (text.length >= 3) {
            const fetchedSuggestions = await fetchSuggestions(text, trackedMeals);
            setSuggestions(fetchedSuggestions);
            
        } else {
            setSuggestions([]);
        }
    };

    const handleSelectSuggestion = async (item) => {
        if (item && item.title) {
        // setQuery(item.title);
        // setSuggestions([]);
        // const detailedInfo = await fetchNutritionInfo(item.title);
        // if (detailedInfo) {
        //   setResults([detailedInfo]);
        // }
        }
    };

    const handleCancelSearch = () => {
        setQuery('');
        setSuggestions([]);
        setIsFocused(false);
        Keyboard.dismiss();
    };

    const handleAdd = async (food_item) => {
        try {
        const nutriData = await fetchNutritionInfo(food_item);
        await addMeal(nutriData, meal_type, selectedDate);

        // Trigger a refresh
        setRefresh((prev) => !prev);
        const updatedSuggestions = suggestions.filter(item => item.food_name !== food_item);
        setSuggestions(updatedSuggestions);
        } catch (error) {
        console.error('Error adding meal item:', error);
        }
    }

    return (
        <View style={styles.searchContainer}>
            <TextInput
                style={styles.searchInput}
                placeholder="Search for a food"
                value={query}
                onChangeText={handleSearchChange}
                onFocus={() => setIsFocused(true)}
            />
            {isFocused && query.length >= 1 && (
                <TouchableOpacity onPress={handleCancelSearch} style={styles.cancelButton}>
                <MaterialIcons name="cancel" size={24} color="gray" />
                </TouchableOpacity>
            )}
            {isFocused && query.length >= 3 && (
                <View style={styles.suggestionsContainer}>
                    <FlatList
                        data={suggestions}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <SearchListItem
                                item={item}
                                onAdd={handleAdd}
                            />
                        )}
                        contentContainerStyle={{ gap: 5 }}
                    />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    position: 'relative',
    zIndex: 2,
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    height: 40,
    backgroundColor: '#E0E0E0',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  suggestionsContainer: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    backgroundColor: '#FFF',
    borderColor: '#E0E0E0',
    borderWidth: 1,
    zIndex: 3,
    maxHeight: 330,
  },
  suggestion: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  cancelButton: {
    position: 'absolute',
    right: 10,
  },
  noResultsText: {
    padding: 10,
    textAlign: 'center',
    color: 'gray',
  },
});

export default AutoCompleteSearchBar;

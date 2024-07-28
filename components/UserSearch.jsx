import React, { useEffect, useState } from 'react';
import { View, TextInput, FlatList, Text , TouchableOpacity, StyleSheet, Image } from 'react-native';
import { icons } from '../constants';
import { useGlobalContext } from '../context/GlobalProvider';
import { getSuggestedUsersDetails } from '../lib/supabase';

const UserSearch = ({ searchFunction, onUserClick }) => {
  const { refresh } = useGlobalContext();
  const [ query, setQuery ] = useState('');
  const [ results, setResults ] = useState([]);
  const [ suggestedUsers, setSuggestedUsers ] = useState([]);
  const [ isInputActive, setIsInputActive ] = useState(false);

  useEffect( () => {
    const fetchInfo = async () => {
        const data = await getSuggestedUsersDetails();
        console.log('results of all users: ', data);
        setSuggestedUsers(data);
    }

    fetchInfo();
  }, [refresh]);

  const handleSearch = async (text) => {
    setQuery(text);
    if (text.length > 2) { 
      const response = await searchFunction(text);
      setResults(response);
    } else {
      setResults([]);
    }
  };

  return (
    <>
    <View style={styles.searchContainer}>
      <TextInput
        placeholder="Search by username"
        value={query}
        onChangeText={handleSearch}
        onFocus={() => setIsInputActive(true)}
        onBlur={() => setIsInputActive(false)}
        style={styles.searchInput}
      />
    </View>
    {query.length <= 2 && (
      <View className='my-2'>
        <Text className='text-xl font-semibold'>Suggested</Text>
      </View>
    )}
    <FlatList
      data={isInputActive && query.length > 2 ? results : suggestedUsers}
      keyExtractor={(item) => item.username}
      renderItem={({ item }) => (
        <View className='flex-row my-2 justify-between'>
          <TouchableOpacity 
            activeOpacity={0.7}
            onPress={() => onUserClick(item.user_id)}
            className='flex-row items-center'
          >
            <Image 
              source={item.profile_picture_url ? {uri: item.profile_picture_url} : icons.profile}
              style={styles.profilePic}
            />
            <Text style={styles.usernameText}>{item.username}</Text>
          </TouchableOpacity>
        </View>
      )}
    />
    </>
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
  usernameText: {
    fontSize: 16,
    padding: 10,
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
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  followButton: {
    borderColor: 'green',
  },
});

export default UserSearch;

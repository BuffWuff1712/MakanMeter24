/*import React, { useState } from 'react';
import { View, TextInput, FlatList, Text , TouchableOpacity, StyleSheet } from 'react-native';

const UserSearch = ({ searchFunction, onUserClick }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

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
    <View>
      <TextInput
        placeholder="Search by username"
        value={query}
        onChangeText={handleSearch}
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, padding: 10 }}
      />
      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text>{item.username}</Text>}
      />
    </View>
  );
};

export default UserSearch;*/

//new draft here 
import React, { useState } from 'react';
import { View, TextInput, FlatList, Text , TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { icons } from '../constants';
import { Button } from 'react-native-paper';

const UserSearch = ({ searchFunction, onUserClick }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [followStatus, setFollowStatus] = useState(false); 

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
        style={styles.searchInput}
      />
    
    </View>
    {query.length > 2 && (
          <FlatList
          data={results}
          keyExtractor={(item) => item.username}
          renderItem={({ item }) => (
            <View className='flex-row my-2 justify-between'>
              <TouchableOpacity 
                activeOpacity={0.7}
                onPress={() => onUserClick(item.user_id)}
                className='flex-row items-center'
              >
                <Image 
                  source={item.profile_picture_url ? {uri: item.profile_picture_url} : icons.eye}
                  style={styles.profilePic}
                />
                <Text style={styles.usernameText}>{item.username}</Text>
              </TouchableOpacity>
            </View>

          )}/>
      )}
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
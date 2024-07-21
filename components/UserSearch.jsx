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
        style={styles.searchInput}
      />
      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onUserClick(item.username)}>
            <Text style={styles.usernameText}>{item.username}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
  },
  usernameText: {
    fontSize: 16,
    padding: 10,
  },
});

export default UserSearch;
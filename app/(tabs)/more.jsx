//new draft here 
/*import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert, Modal, FlatList, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { icons } from '../../constants';
import { getEmail, signOut } from '../../lib/supabase';
import { useGlobalContext } from '../../context/GlobalProvider';
import { router } from 'expo-router';

const Profile = () => {
  const { user, setUser, setIsLoggedIn } = useGlobalContext();
  const [profileImage, setProfileImage] = useState(null);
  const [emailHandle, setEmailHandle] = useState('');
  const [friendsModalVisible, setFriendsModalVisible] = useState(false);
  const [newUsername, setNewUsername] = useState('');

  useEffect(() => {
    const fetchEmail = async () => {
      if (user) {
        const fetchedEmail = await getEmail(user);
        console.log(fetchedEmail);
        setEmailHandle(fetchedEmail);
      }
    };

    const fetchUsername = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem('username');
        if (storedUsername) {
          setNewUsername(storedUsername);
        } else {
          setNewUsername(user?.username || 'Username');
        }
      } catch (error) {
        console.error('Error fetching username:', error);
      }
    };

    fetchEmail();
    fetchProfileImage(); // Fetch profile image URI on component mount
    fetchUsername(); // Fetch username on component mount
  }, [user]);

  const fetchProfileImage = async () => {
    try {
      const storedProfileImage = await AsyncStorage.getItem('profileImageURI');
      if (storedProfileImage !== null) {
        setProfileImage(storedProfileImage);
      }
    } catch (error) {
      console.error('Error fetching profile image:', error);
    }
  };

  const saveProfileImage = async (imageURI) => {
    try {
      await AsyncStorage.setItem('profileImageURI', imageURI); // Save profile image URI to AsyncStorage
      setProfileImage(imageURI); // Update state with the new URI
    } catch (error) {
      console.error('Error saving profile image:', error);
    }
  };

  const saveUsername = async (username) => {
    try {
      await AsyncStorage.setItem('username', username); // Save username to AsyncStorage
      setNewUsername(username); // Update state with the new username
    } catch (error) {
      console.error('Error saving username:', error);
    }
  };

  const handleUsernameChange = (text) => {
    setNewUsername(text);
  };

  const logout = async () => {
    try {
      await signOut();
      setUser(null);
      setIsLoggedIn(false);
      router.replace('/sign-in');
    } catch (error) {
      console.error('Error on logout:', error);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (result.granted === false) {
      Alert.alert('Permission to access camera roll is required!');
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!pickerResult.cancelled) {
      console.log('Selected image URI:', pickerResult.assets[0].uri);
      saveProfileImage(pickerResult.assets[0].uri); // Save URI to AsyncStorage and update state
    }
  };

  const placeholderFriends = ['Friend 1', 'Friend 2', 'Friend 3', 'Friend 4', 'Friend 5'];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={pickImage} style={styles.avatarContainer}>
          <Image
            source={profileImage ? { uri: profileImage } : icons.eye}
            style={styles.avatar}
          />
        </TouchableOpacity>
        <View style={styles.userInfo}>
          <TextInput
            style={styles.usernameInput}
            value={newUsername}
            onChangeText={handleUsernameChange}
            onBlur={() => saveUsername(newUsername)}
          />
          <Text style={styles.email}>{emailHandle}</Text>
        </View>
      </View>

      //Middle Section with Placeholder Tabs
      <View style={styles.tabsContainer}>
        <TouchableOpacity style={styles.tab} onPress={() => setFriendsModalVisible(true)}>
          <Image source={icons.friends} style={styles.tabIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Image source={icons.photos} style={styles.tabIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Image source={icons.posts} style={styles.tabIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Image source={icons.settings} style={styles.tabIcon} />
        </TouchableOpacity>
      </View>

      //Friends Modal
      <Modal
        animationType="slide"
        transparent={true}
        visible={friendsModalVisible}
        onRequestClose={() => {
          setFriendsModalVisible(!friendsModalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Friends List</Text>
            <FlatList
              data={placeholderFriends}
              keyExtractor={(item) => item}
              renderItem={({ item }) => <Text style={styles.friendItem}>{item}</Text>}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setFriendsModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      //Logout Button
      <TouchableOpacity onPress={logout} style={styles.logoutButton}>
        <Image source={icons.logout} resizeMode="contain" style={styles.logoutIcon} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  avatarContainer: {
    marginRight: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  userInfo: {
    flex: 1,
  },
  usernameInput: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 14,
    color: 'gray',
  },
  tabsContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10,
  },
  tab: {
    width: '48%',
    height: '40%',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  tabIcon: {
    width: 50,
    height: 50,
  },
  logoutButton: {
    position: 'absolute',
    bottom: 40,
    right: 16,
  },
  logoutIcon: {
    width: 24,
    height: 24,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  friendItem: {
    fontSize: 16,
    paddingVertical: 10,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Profile;*/

//new draft here 
/*import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert, Modal, FlatList, TextInput, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { icons } from '../../constants';
import { getEmail, signOut } from '../../lib/supabase';
import { useGlobalContext } from '../../context/GlobalProvider';
import { router } from 'expo-router';

const Profile = () => {
  const { user, setUser, setIsLoggedIn } = useGlobalContext();
  const [profileImage, setProfileImage] = useState(null);
  const [emailHandle, setEmailHandle] = useState('');
  const [friendsModalVisible, setFriendsModalVisible] = useState(false);
  const [settingsModalVisible, setSettingsModalVisible] = useState(false);
  const [newUsername, setNewUsername] = useState('');

  useEffect(() => {
    const fetchEmail = async () => {
      if (user) {
        const fetchedEmail = await getEmail(user);
        console.log(fetchedEmail);
        setEmailHandle(fetchedEmail);
      }
    };

    const fetchUsername = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem('username');
        if (storedUsername) {
          setNewUsername(storedUsername);
        } else {
          setNewUsername(user?.username || 'Username');
        }
      } catch (error) {
        console.error('Error fetching username:', error);
      }
    };

    fetchEmail();
    fetchProfileImage(); // Fetch profile image URI on component mount
    fetchUsername(); // Fetch username on component mount
  }, [user]);

  const fetchProfileImage = async () => {
    try {
      const storedProfileImage = await AsyncStorage.getItem('profileImageURI');
      if (storedProfileImage !== null) {
        setProfileImage(storedProfileImage);
      }
    } catch (error) {
      console.error('Error fetching profile image:', error);
    }
  };

  const saveProfileImage = async (imageURI) => {
    try {
      await AsyncStorage.setItem('profileImageURI', imageURI); // Save profile image URI to AsyncStorage
      setProfileImage(imageURI); // Update state with the new URI
    } catch (error) {
      console.error('Error saving profile image:', error);
    }
  };

  const saveUsername = async (username) => {
    try {
      await AsyncStorage.setItem('username', username); // Save username to AsyncStorage
      setNewUsername(username); // Update state with the new username
    } catch (error) {
      console.error('Error saving username:', error);
    }
  };

  const logout = async () => {
    try {
      await signOut();
      setUser(null);
      setIsLoggedIn(false);
      router.replace('/sign-in');
    } catch (error) {
      console.error('Error on logout:', error);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (result.granted === false) {
      Alert.alert('Permission to access camera roll is required!');
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!pickerResult.cancelled) {
      console.log('Selected image URI:', pickerResult.assets[0].uri);
      saveProfileImage(pickerResult.assets[0].uri); // Save URI to AsyncStorage and update state
    }
  };

  const placeholderFriends = ['Friend 1', 'Friend 2', 'Friend 3', 'Friend 4', 'Friend 5'];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={pickImage} style={styles.avatarContainer}>
          <Image
            source={profileImage ? { uri: profileImage } : icons.eye}
            style={styles.avatar}
          />
        </TouchableOpacity>
        <View style={styles.userInfo}>
          <Text style={styles.username}>{newUsername}</Text>
          <Text style={styles.email}>{emailHandle}</Text>
        </View>
      </View>

      <View style={styles.tabsContainer}>
        <TouchableOpacity style={styles.tab} onPress={() => setFriendsModalVisible(true)}>
          <Image source={icons.friends} style={styles.tabIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Image source={icons.photos} style={styles.tabIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Image source={icons.posts} style={styles.tabIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab} onPress={() => setSettingsModalVisible(true)}>
          <Image source={icons.settings} style={styles.tabIcon} />
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={friendsModalVisible}
        onRequestClose={() => {
          setFriendsModalVisible(!friendsModalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Friends List</Text>
            <FlatList
              data={placeholderFriends}
              keyExtractor={(item) => item}
              renderItem={({ item }) => <Text style={styles.friendItem}>{item}</Text>}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setFriendsModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={settingsModalVisible}
        onRequestClose={() => {
          setSettingsModalVisible(!settingsModalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Settings</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter new username"
              value={newUsername}
              onChangeText={setNewUsername}
            />
            <TouchableOpacity
              style={styles.saveButton}
              onPress={() => {
                saveUsername(newUsername);
                setSettingsModalVisible(false);
              }}
            >
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setSettingsModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <TouchableOpacity onPress={logout} style={styles.logoutButton}>
        <Image source={icons.logout} resizeMode="contain" style={styles.logoutIcon} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  avatarContainer: {
    marginRight: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  userInfo: {
    flex: 1,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 14,
    color: 'gray',
  },
  tabsContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10,
  },
  tab: {
    width: '48%',
    height: '40%',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  tabIcon: {
    width: 50,
    height: 50,
  },
  logoutButton: {
    position: 'absolute',
    bottom: 40,
    right: 16,
  },
  logoutIcon: {
    width: 24,
    height: 24,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  saveButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
  },
  closeButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
  friendItem: {
    fontSize: 16,
    paddingVertical: 10,
  },
});

export default Profile;*/

//new draft here 
import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert, Modal, FlatList, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { icons } from '../../constants';
import { getEmail, signOut } from '../../lib/supabase';
import { useGlobalContext } from '../../context/GlobalProvider';
import { router } from 'expo-router';

const Profile = () => {
  const { user, setUser, setIsLoggedIn } = useGlobalContext();
  const [profileImage, setProfileImage] = useState(null);
  const [emailHandle, setEmailHandle] = useState('');
  const [friendsModalVisible, setFriendsModalVisible] = useState(false);
  const [settingsModalVisible, setSettingsModalVisible] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [tempUsername, setTempUsername] = useState('');

  useEffect(() => {
    const fetchEmail = async () => {
      if (user) {
        const fetchedEmail = await getEmail(user);
        console.log(fetchedEmail);
        setEmailHandle(fetchedEmail);
      }
    };

    const fetchUsername = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem('username');
        if (storedUsername) {
          setNewUsername(storedUsername);
          setTempUsername(storedUsername); // Initialize tempUsername with stored username
        } else {
          setNewUsername(user?.username || 'Username');
          setTempUsername(user?.username || 'Username');
        }
      } catch (error) {
        console.error('Error fetching username:', error);
      }
    };

    fetchEmail();
    fetchProfileImage(); // Fetch profile image URI on component mount
    fetchUsername(); // Fetch username on component mount
  }, [user]);

  const fetchProfileImage = async () => {
    try {
      const storedProfileImage = await AsyncStorage.getItem('profileImageURI');
      if (storedProfileImage !== null) {
        setProfileImage(storedProfileImage);
      }
    } catch (error) {
      console.error('Error fetching profile image:', error);
    }
  };

  const saveProfileImage = async (imageURI) => {
    try {
      await AsyncStorage.setItem('profileImageURI', imageURI); // Save profile image URI to AsyncStorage
      setProfileImage(imageURI); // Update state with the new URI
    } catch (error) {
      console.error('Error saving profile image:', error);
    }
  };

  const saveUsername = async (username) => {
    try {
      if (username.trim() === '') {
        Alert.alert('Error', 'Username cannot be blank.');
        return;
      }
  
      await AsyncStorage.setItem('username', username); // Save username to AsyncStorage
      setNewUsername(username); // Update state with the new username
      setTempUsername(username); // Update tempUsername with the new username
    } catch (error) {
      console.error('Error saving username:', error);
    }
  };
  

  const logout = async () => {
    try {
      await signOut();
      setUser(null);
      setIsLoggedIn(false);
      router.replace('/sign-in');
    } catch (error) {
      console.error('Error on logout:', error);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (result.granted === false) {
      Alert.alert('Permission to access camera roll is required!');
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!pickerResult.cancelled) {
      console.log('Selected image URI:', pickerResult.assets[0].uri);
      saveProfileImage(pickerResult.assets[0].uri); // Save URI to AsyncStorage and update state
    }
  };

  const placeholderFriends = ['Friend 1', 'Friend 2', 'Friend 3', 'Friend 4', 'Friend 5'];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={pickImage} style={styles.avatarContainer}>
          <Image
            source={profileImage ? { uri: profileImage } : icons.eye}
            style={styles.avatar}
          />
        </TouchableOpacity>
        <View style={styles.userInfo}>
          <Text style={styles.username}>{newUsername}</Text>
          <Text style={styles.email}>{emailHandle}</Text>
        </View>
      </View>

      <View style={styles.tabsContainer}>
        <TouchableOpacity style={styles.tab} onPress={() => setFriendsModalVisible(true)}>
          <Image source={icons.friends} style={styles.tabIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Image source={icons.photos} style={styles.tabIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Image source={icons.posts} style={styles.tabIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab} onPress={() => setSettingsModalVisible(true)}>
          <Image source={icons.settings} style={styles.tabIcon} />
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={friendsModalVisible}
        onRequestClose={() => {
          setFriendsModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Friends List</Text>
            <FlatList
              data={placeholderFriends}
              keyExtractor={(item) => item}
              renderItem={({ item }) => <Text style={styles.friendItem}>{item}</Text>}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setFriendsModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={settingsModalVisible}
        onRequestClose={() => {
          setSettingsModalVisible(false);
          setNewUsername(tempUsername); // Reset newUsername to tempUsername on modal close
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Settings</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter new username"
              value={newUsername}
              onChangeText={setNewUsername}
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.saveButton}
                onPress={() => {
                  saveUsername(newUsername);
                  setSettingsModalVisible(false);
                }}
              >
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
              
            </View>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => {
                setSettingsModalVisible(false);
                setNewUsername(tempUsername); // Reset newUsername to tempUsername on close button press
              }}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <TouchableOpacity onPress={logout} style={styles.logoutButton}>
        <Image source={icons.logout} resizeMode="contain" style={styles.logoutIcon} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  avatarContainer: {
    marginRight: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  userInfo: {
    flex: 1,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 14,
    color: 'gray',
  },
  tabsContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10,
  },
  tab: {
    width: '48%',
    height: '40%',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  tabIcon: {
    width: 50,
    height: 50,
  },
  logoutButton: {
    position: 'absolute',
    bottom: 40,
    right: 16,
  },
  logoutIcon: {
    width: 24,
    height: 24,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  saveButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: '100%',
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
  },
  cancelButton: {
    backgroundColor: '#DC3545',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  cancelButtonText: {
    color: 'white',
    fontSize: 16,
  },
  closeButton: {
    backgroundColor: '#6C757D',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  friendItem: {
    fontSize: 16,
    paddingVertical: 10,
  },
});

export default Profile;
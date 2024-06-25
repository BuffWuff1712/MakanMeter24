//new draft here 
/*import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert, Modal, FlatList, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker'; // Corrected import statement
import { icons } from '../../constants';
import { getEmail, signOut } from '../../lib/supabase';
import { useGlobalContext } from '../../context/GlobalProvider';
import { router } from 'expo-router';
import { changePassword } from '../../lib/supabase';

const Profile = () => {
  const { user, setUser, setIsLoggedIn } = useGlobalContext();
  const [profileImage, setProfileImage] = useState(null);
  const [emailHandle, setEmailHandle] = useState('');
  const [friendsModalVisible, setFriendsModalVisible] = useState(false);
  const [settingsModalVisible, setSettingsModalVisible] = useState(false);
  const [editUsernameModalVisible, setEditUsernameModalVisible] = useState(false);
  const [editDetailsModalVisible, setEditDetailsModalVisible] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [tempUsername, setTempUsername] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [gender, setGender] = useState('');

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

    const fetchUserDetails = async () => {
      try {
        const storedHeight = await AsyncStorage.getItem('height');
        const storedWeight = await AsyncStorage.getItem('weight');
        const storedGender = await AsyncStorage.getItem('gender');
        
        if (storedHeight) setHeight(storedHeight);
        if (storedWeight) setWeight(storedWeight);
        if (storedGender) setGender(storedGender);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchEmail();
    fetchProfileImage(); // Fetch profile image URI on component mount
    fetchUsername(); // Fetch username on component mount
    fetchUserDetails(); // Fetch height, weight, and gender on component mount
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

  const saveUserDetails = async (height, weight, gender) => {
    try {
      await AsyncStorage.setItem('height', height);
      await AsyncStorage.setItem('weight', weight);
      await AsyncStorage.setItem('gender', gender);
    } catch (error) {
      console.error('Error saving user details:', error);
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
          <Text style={styles.detailText}>Height: {height}</Text>
          <Text style={styles.detailText}>Weight: {weight}</Text>
          <Text style={styles.detailText}>Gender: {gender}</Text>
        </View>
      </View>

      <View style={styles.tabsContainer}>
        <TouchableOpacity style={styles.tab} onPress={() => setFriendsModalVisible(true)}>
          <Image source={icons.friends} style={styles.tabIcon} />
          <Text style={styles.tabText}>Friends</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Image source={icons.photos} style={styles.tabIcon} />
          <Text style={styles.tabText}>Photos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Image source={icons.posts} style={styles.tabIcon} />
          <Text style={styles.tabText}>Posts</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab} onPress={() => setSettingsModalVisible(true)}>
          <Image source={icons.settings} style={styles.tabIcon} />
          <Text style={styles.tabText}>Settings</Text>
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
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Settings</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                setEditUsernameModalVisible(true);
                setSettingsModalVisible(false);
              }}
            >
              <Text style={styles.modalButtonText}>Change Username</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                setEditDetailsModalVisible(true);
                setSettingsModalVisible(false);
              }}
            >
              <Text style={styles.modalButtonText}>Change Details</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
            >
              <Text style={styles.modalButtonText}>Change Password</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
            >
              <Text style={styles.modalButtonText}>Placeholder 2</Text>
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

      <Modal
        animationType="slide"
        transparent={true}
        visible={editUsernameModalVisible}
        onRequestClose={() => {
          setEditUsernameModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Change Username</Text>
            <TextInput
              style={styles.input}
              value={tempUsername}
              onChangeText={(text) => setTempUsername(text)}
            />
            <TouchableOpacity
              style={styles.saveButton}
              onPress={() => {
                saveUsername(tempUsername);
                setEditUsernameModalVisible(false);
              }}
            >
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => {
                setEditUsernameModalVisible(false);
                setTempUsername(newUsername); // Reset tempUsername to the current username on cancel
              }}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={editDetailsModalVisible}
        onRequestClose={() => {
          setEditDetailsModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Change Details</Text>
            <TextInput
              style={styles.input}
              placeholder="Height"
              value={height}
              keyboardType="numeric"
              onChangeText={(text) => setHeight(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Weight"
              value={weight}
              keyboardType="numeric"
              onChangeText={(text) => setWeight(text)}
            />
            <Picker
              selectedValue={gender}
              style={styles.input}
              onValueChange={(itemValue) => setGender(itemValue)}
            >
              <Picker.Item label="Select Gender" value="" />
              <Picker.Item label="Male" value="Male" />
              <Picker.Item label="Female" value="Female" />
            </Picker>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={() => {
                saveUserDetails(height, weight, gender);
                setEditDetailsModalVisible(false);
              }}
            >
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setEditDetailsModalVisible(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
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
  detailText: {
    fontSize: 14,
    color: 'black',
  },
  tabsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10,
  },
  tab: {
    width: '48%',
    height: '30%', // Adjusted height to make space for the additional details
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
  tabText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
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
  modalButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: '100%',
    alignItems: 'center',
  },
  modalButtonText: {
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
import { Picker } from '@react-native-picker/picker'; // Corrected import statement
import { icons } from '../../constants';
import { getEmail, signOut, changePassword } from '../../lib/supabase';
import { useGlobalContext } from '../../context/GlobalProvider';
import { router } from 'expo-router';

const Profile = () => {
  const { user, setUser, setIsLoggedIn } = useGlobalContext();
  const [profileImage, setProfileImage] = useState(null);
  const [emailHandle, setEmailHandle] = useState('');
  const [friendsModalVisible, setFriendsModalVisible] = useState(false);
  const [settingsModalVisible, setSettingsModalVisible] = useState(false);
  const [editUsernameModalVisible, setEditUsernameModalVisible] = useState(false);
  const [editDetailsModalVisible, setEditDetailsModalVisible] = useState(false);
  const [changePasswordModalVisible, setChangePasswordModalVisible] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [tempUsername, setTempUsername] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [gender, setGender] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

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

    const fetchUserDetails = async () => {
      try {
        const storedHeight = await AsyncStorage.getItem('height');
        const storedWeight = await AsyncStorage.getItem('weight');
        const storedGender = await AsyncStorage.getItem('gender');
        
        if (storedHeight) setHeight(storedHeight);
        if (storedWeight) setWeight(storedWeight);
        if (storedGender) setGender(storedGender);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchEmail();
    fetchProfileImage(); // Fetch profile image URI on component mount
    fetchUsername(); // Fetch username on component mount
    fetchUserDetails(); // Fetch height, weight, and gender on component mount
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

  const saveUserDetails = async (height, weight, gender) => {
    try {
      await AsyncStorage.setItem('height', height);
      await AsyncStorage.setItem('weight', weight);
      await AsyncStorage.setItem('gender', gender);
    } catch (error) {
      console.error('Error saving user details:', error);
    }
  };

  const handleChangePassword = async () => {
    const { success, error } = await changePassword(emailHandle, currentPassword, newPassword);

    if (success) {
      Alert.alert('Success', 'Password changed successfully.');
      setChangePasswordModalVisible(false);
      setCurrentPassword('');
      setNewPassword('');
    } else {
      Alert.alert('Error', error);
    }
  };

  const logout = async () => {
    try {
      await signOut();
      
      setIsLoggedIn(false);
      router.replace('/sign-in');
      setUser('');
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
          <Text style={styles.detailText}>Height: {height}</Text>
          <Text style={styles.detailText}>Weight: {weight}</Text>
          <Text style={styles.detailText}>Gender: {gender}</Text>
        </View>
      </View>

      <View style={styles.tabsContainer}>
        <TouchableOpacity style={styles.tab} onPress={() => setFriendsModalVisible(true)}>
          <Image source={icons.friends} style={styles.tabIcon} />
          <Text style={styles.tabText}>Friends</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Image source={icons.photos} style={styles.tabIcon} />
          <Text style={styles.tabText}>Photos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Image source={icons.posts} style={styles.tabIcon} />
          <Text style={styles.tabText}>Posts</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab} onPress={() => setSettingsModalVisible(true)}>
          <Image source={icons.settings} style={styles.tabIcon} />
          <Text style={styles.tabText}>Settings</Text>
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
            <Text style={styles.modalTitle}>Friends</Text>
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
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                setEditUsernameModalVisible(true);
                setSettingsModalVisible(false);
              }}
            >
              <Text style={styles.modalButtonText}>Edit Username</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                setEditDetailsModalVisible(true);
                setSettingsModalVisible(false);
              }}
            >
              <Text style={styles.modalButtonText}>Edit Details</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                setChangePasswordModalVisible(true);
                setSettingsModalVisible(false);
              }}
            >
              <Text style={styles.modalButtonText}>Change Password</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.logoutButton} onPress={logout}>
              <Text style={styles.logoutButtonText}>Logout</Text>
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

      <Modal
        animationType="slide"
        transparent={true}
        visible={editUsernameModalVisible}
        onRequestClose={() => {
          setEditUsernameModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Username</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter new username"
              value={tempUsername}
              onChangeText={setTempUsername}
            />
            <TouchableOpacity
              style={styles.saveButton}
              onPress={() => {
                saveUsername(tempUsername);
                setEditUsernameModalVisible(false);
              }}
            >
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setEditUsernameModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={editDetailsModalVisible}
        onRequestClose={() => {
          setEditDetailsModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Details</Text>
            <TextInput
              style={styles.input}
              placeholder="Height"
              value={height}
              onChangeText={setHeight}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="Weight"
              value={weight}
              onChangeText={setWeight}
              keyboardType="numeric"
            />
            <Picker
              selectedValue={gender}
              onValueChange={(itemValue) => setGender(itemValue)}
              style={styles.input}
            >
              <Picker.Item label="Select Gender" value="" />
              <Picker.Item label="Male" value="male" />
              <Picker.Item label="Female" value="female" />
              <Picker.Item label="Other" value="other" />
            </Picker>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={() => {
                saveUserDetails(height, weight, gender);
                setEditDetailsModalVisible(false);
              }}
            >
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setEditDetailsModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={changePasswordModalVisible}
        onRequestClose={() => {
          setChangePasswordModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Change Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Current Password"
              value={currentPassword}
              onChangeText={setCurrentPassword}
              secureTextEntry
            />
            <TextInput
              style={styles.input}
              placeholder="New Password"
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry
            />
            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleChangePassword}
            >
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setChangePasswordModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
    marginRight: 20,
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  userInfo: {
    flex: 1,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  email: {
    fontSize: 18,
    color: 'gray',
    marginBottom: 10,
  },
  detailText: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 5,
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  tab: {
    alignItems: 'center',
  },
  tabIcon: {
    width: 40,
    height: 40,
    marginBottom: 5,
  },
  tabText: {
    fontSize: 16,
    color: 'black',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalButton: {
    width: '100%',
    padding: 15,
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  modalButtonText: {
    fontSize: 18,
    color: 'white',
  },
  friendItem: {
    fontSize: 16,
    marginBottom: 5,
  },
  closeButton: {
    padding: 10,
    backgroundColor: '#f44336',
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  closeButtonText: {
    fontSize: 18,
    color: 'white',
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginBottom: 10,
  },
  saveButton: {
    width: '100%',
    padding: 15,
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 18,
    color: 'white',
  },
  logoutButton: {
    width: '100%',
    padding: 15,
    backgroundColor: '#f44336',
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  logoutButtonText: {
    fontSize: 18,
    color: 'white',
  },
});

export default Profile;

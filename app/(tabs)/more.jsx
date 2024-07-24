import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert, Modal, TextInput, TouchableWithoutFeedback, Keyboard, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from 'react-native-wheel-pick';
import { icons } from '../../constants';
import { signOut, changePassword, getUserDetails, updateUser, updateProfilePic} from '../../lib/supabase';
import { useGlobalContext } from '../../context/GlobalProvider';
import { router } from 'expo-router';


const Profile = () => {
  const { user, setUser, setIsLoggedIn, refresh, setRefresh } = useGlobalContext();
  const [profileImage, setProfileImage] = useState(null);
  const [emailHandle, setEmailHandle] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [settingsModalVisible, setSettingsModalVisible] = useState(false);
  const [editUsernameModalVisible, setEditUsernameModalVisible] = useState(false);
  const [editDetailsModalVisible, setEditDetailsModalVisible] = useState(false);
  const [changePasswordModalVisible, setChangePasswordModalVisible] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [tempUsername, setTempUsername] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [gender, setGender] = useState('Male');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [selectedUser, setSelectedUser] = useState({});
  const [userDetails, setUserDetails] = useState(null);
  const [userDetailsModalVisible, setUserDetailsModalVisible] = useState(false);

  useEffect(() => {
  
    const fetchUserDetails = async () => {
      try {
        const details = await getUserDetails(user);
        setUserDetails(details);
        const storedEmail = details.email;
        const storedUsername = details.username;
        const storedHeight = details.height;
        const storedWeight = details.weight;
        const storedGender = details.gender;
        const storedProfilePic = details.profile_picture_url;
        
        if (storedEmail) setEmailHandle(storedEmail);
        if (storedUsername) {
          setTempUsername(storedUsername);
          setNewUsername(storedUsername);
        }
        if (storedHeight) setHeight(storedHeight);
        if (storedWeight) setWeight(storedWeight);
        if (storedGender) setGender(storedGender);
        if (storedProfilePic) setProfileImage(storedProfilePic);

        console.log('profile pic public url: ', storedProfilePic);
      

      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails(); 
  }, [user, refresh]);

  const saveProfileImage = async (imageUri) => {
    try {
      setIsLoading(true);
      const filePath = `${user}/profile-pic.jpeg`;

      const formData = new FormData();
      formData.append('file', {
        uri: imageUri,
        name: 'photo.jpg',
        type: 'image/jpeg'
      });

      const publicURL = await updateProfilePic(user, filePath, formData);

      setProfileImage(publicURL);

      setRefresh((prev) => !prev);
    } catch (error) {
      console.error('Error saving profile image:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveUsername = async (username) => {
    try {
      if (username.trim() === '') {
        Alert.alert('Error', 'Username cannot be blank.');
        return;
      }
      const newData = {username: username};
      await updateUser(user, newData);
      setRefresh((prev) => !prev);
      Alert.alert('New Username Saved');
    } catch (error) {
      console.error('Error saving username:', error);
    }
  };

  const saveUserDetails = async (height, weight, gender) => {
    try {
      const newData = {height: height, weight: weight, gender: gender}
      await updateUser(user, newData);
      Alert.alert('New Details Saved');
      setRefresh((prev) => !prev);
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
      setRefresh((prev) => !prev);
    } else {
      Alert.alert('Error', error);
    }
  };

  const logout = async () => {
    setSettingsModalVisible(false);
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
      base64: true,
    });

    if (!pickerResult.canceled) {
      console.log('Selected image URI:', pickerResult.assets[0].uri);
      saveProfileImage(pickerResult.assets[0].uri); 
    }
  };

  const placeholderFriends = ['Friend 1', 'Friend 2', 'Friend 3', 'Friend 4', 'Friend 5'];

  //new addition here 
  const handleSearchButtonPress = () => {
    router.navigate('userSearchPage');
  };

  const handleEditGoalsPress = () => {
    router.navigate('setGoals');
  };

  const handleFriendsPress = () => {
    router.navigate('userFriendPage');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={pickImage} style={styles.avatarContainer}>
          {isLoading ? (
            <View className='h-[100px] w-[100px] bg-white rounded-full'>
              <ActivityIndicator size="large" color="#0000ff" style={styles.avatar} />
            </View>
          )
          : (
          <Image
            source={profileImage ? { uri: profileImage } : icons.eye}
            style={styles.avatar}
          />)}
        </TouchableOpacity>
        <View style={styles.userInfo}>
          <Text style={styles.username}>{newUsername}</Text>
          <Text style={styles.email}>{emailHandle}</Text>
          <View style={styles.statsContainer}>
            <View style={styles.stats}>
                <View style={styles.stat}>
                    <Text style={styles.statNumber}>{userDetails?.followers}</Text>
                    <Text style={styles.statLabel}>Followers</Text>
                </View>
                <View style={styles.stat}>
                    <Text style={styles.statNumber}>{userDetails?.following}</Text>
                    <Text style={styles.statLabel}>Following</Text>
                </View>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.card}>
        <Text className='font-semibold text-xl'>Your Basic Info</Text>
        <View style={styles.statsContainer}>
            <View style={styles.stats}>
                <View style={styles.stat}>
                    <Text style={styles.statNumber}>{height} cm</Text>
                    <Text style={styles.statLabel}>Height</Text>
                </View>
                <View style={styles.stat}>
                    <Text style={styles.statNumber}>{weight} kg</Text>
                    <Text style={styles.statLabel}>Weight</Text>
                </View>
                <View style={styles.stat}>
                    <Text style={styles.statNumber}>{gender}</Text>
                    <Text style={styles.statLabel}>Gender</Text>
                </View>
            </View>
        </View>
      </View>

      <View style={styles.tabsContainer}>
        <View style={styles.tabRow}>
          <TouchableOpacity style={styles.tab} onPress={handleFriendsPress}>
            <Image source={icons.friends} style={styles.tabIcon} />
            <Text style={styles.tabText}>Friends</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab} onPress={handleEditGoalsPress}>
            <Image source={icons.target} style={styles.tabIcon} />
            <Text style={styles.tabText}>Edit Goals</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.tabRow}> 
          <TouchableOpacity style={styles.tab} onPress={handleSearchButtonPress}>
            <Image source={icons.posts} style={styles.tabIcon} />
            <Text style={styles.tabText}>Search</Text>
          </TouchableOpacity>

          {selectedUser && (
        <Modal visible={userDetailsModalVisible} animationType="slide" transparent={true}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{selectedUser.username}</Text>
              <Text>{selectedUser.email}</Text>
              <TouchableOpacity style={styles.followButton}>
                <Text style={styles.followButtonText}>Follow</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.closeButton} onPress={() => setUserDetailsModalVisible(false)}>
                <Text style={styles.tabText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
          <TouchableOpacity style={styles.tab} onPress={() => setSettingsModalVisible(true)}>
            <Image source={icons.settings} style={styles.tabIcon} />
            <Text style={styles.tabText}>Settings</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* <Modal
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
              data={['Item 1', 'Item 2', 'Item 3']}
              keyExtractor={(item, index) => index.toString()}
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
      </Modal> */}

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
            <TouchableOpacity
              style={styles.modalButton}
              onPress={logout}
            >
              <Text style={styles.modalButtonText}>Logout</Text>
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
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Edit Username</Text>
              <TextInput
                style={styles.input}
                placeholder={'Username'}
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
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={editDetailsModalVisible}
        onRequestClose={() => {
          setEditDetailsModalVisible(false);
        }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
                pickerData={['Male', 'Female', 'Others']}
                selectedValue={gender}
                style={styles.pickerStyle}
                onValueChange={(itemValue) => setGender(itemValue)}
              />
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
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
          </TouchableWithoutFeedback>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={changePasswordModalVisible}
        onRequestClose={() => {
          setChangePasswordModalVisible(false);
        }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Change Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Current Password"
                secureTextEntry
                value={currentPassword}
                onChangeText={setCurrentPassword}
              />
              <TextInput
                style={styles.input}
                placeholder="New Password"
                secureTextEntry
                value={newPassword}
                onChangeText={setNewPassword}
              />
              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleChangePassword}
              >
                <Text style={styles.saveButtonText}>Change Password</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setChangePasswordModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 20,
    borderWidth: 1,
    borderColor: '#DDD',
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'beige',
  },
  avatarContainer: {
    marginRight: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  userInfo: {
    flex: 1,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 16,
    color: 'gray',
  },
  detailText: {
    fontSize: 14,
  },
  tabsContainer: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  tabRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  tab: {
    alignItems: 'center',
    marginHorizontal: 10,
    paddingVertical: 40,
    paddingHorizontal: 50,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 10,
    backgroundColor: 'beige', 
  },
  tabIcon: {
    width: 50,
    height: 50,
    marginBottom: 5,
  },
  tabText: {
    fontSize: 14,
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalContentSmall: {
    width: '90%',
    maxHeight: '60%',
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  friendItem: {
    fontSize: 18,
    marginVertical: 5,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
  modalButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 5,
    marginVertical: 10,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
  pickerStyle: {
    backgroundColor: 'white', 
    height: 200, 
    width: 275, 
    borderWidth: 1, 
    borderColor:'#DDD',
    paddingHorizontal: 10, 
    borderRadius: 10
  },
  followButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
  },
  followButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
  card: {
    backgroundColor: 'beige',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 10,
    padding: 15,
    marginVertical: 5,
    marginHorizontal: 30,
  },
  statsContainer: {
    marginTop: 15,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  stat: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 14,
    color: '#888',
  },
});

export default Profile;
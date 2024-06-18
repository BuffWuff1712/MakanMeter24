
//new draft here 
/*
import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
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

  useEffect(() => {
    const fetchEmail = async () => {
      if (user) {
        const fetchedEmail = await getEmail(user);
        console.log(fetchedEmail);
        setEmailHandle(fetchedEmail);
      }
    };
    
    fetchEmail();
    fetchProfileImage(); // Fetch profile image URI on component mount
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
          <Text style={styles.username}>{user?.username || 'Username'}</Text>
          <Text style={styles.email}>{emailHandle}</Text>
        </View>
      </View>

      //Middle Section with Placeholder Tabs
      <View style={styles.tabsContainer}>
        <TouchableOpacity style={styles.tab}>
          <Text style={styles.tabText}>Friends</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Text style={styles.tabText}>Photos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Text style={styles.tabText}>Posts</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Text style={styles.tabText}>Settings</Text>
        </TouchableOpacity>
      </View>

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
  username: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 14,
    color: 'gray',
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingHorizontal: 10,
    flexWrap: 'wrap',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginHorizontal: 5,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
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
});

export default Profile;*/

/*import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
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

  useEffect(() => {
    const fetchEmail = async () => {
      if (user) {
        const fetchedEmail = await getEmail(user);
        console.log(fetchedEmail);
        setEmailHandle(fetchedEmail);
      }
    };
    
    fetchEmail();
    fetchProfileImage(); // Fetch profile image URI on component mount
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
          <Text style={styles.username}>{user?.username || 'Username'}</Text>
          <Text style={styles.email}>{emailHandle}</Text>
        </View>
      </View>

      //Middle Section with Placeholder Tabs
      <View style={styles.tabsContainer}>
        <TouchableOpacity style={styles.tab}>
          <Text style={styles.tabText}>Friends</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Text style={styles.tabText}>Photos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Text style={styles.tabText}>Posts</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Text style={styles.tabText}>Settings</Text>
        </TouchableOpacity>
      </View>

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
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
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
});

export default Profile;*/

//new draft here 
import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
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

  useEffect(() => {
    const fetchEmail = async () => {
      if (user) {
        const fetchedEmail = await getEmail(user);
        console.log(fetchedEmail);
        setEmailHandle(fetchedEmail);
      }
    };
    
    fetchEmail();
    fetchProfileImage(); // Fetch profile image URI on component mount
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
          <Text style={styles.username}>{user?.username || 'Username'}</Text>
          <Text style={styles.email}>{emailHandle}</Text>
        </View>
      </View>

      {/* Middle Section with Placeholder Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity style={styles.tab}>
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

      {/* Logout Button */}
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
    height: '48%',
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
});

export default Profile;

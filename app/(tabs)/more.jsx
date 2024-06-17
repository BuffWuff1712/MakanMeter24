//this is the original code 
/*import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Image, FlatList, TouchableOpacity } from "react-native";

import { icons } from "../../constants";
import useSupabase from "../../lib/useSupabase";
import { signOut } from "../../lib/supabase";
import { useGlobalContext } from "../../context/GlobalProvider";

const Profile = () => {
  const { user, setUser, setIsLoggedIn } = useGlobalContext();
  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLoggedIn(false);

    router.replace("/sign-in");
  };
  return (
    <SafeAreaView className="h-full">
      <FlatList
        ListHeaderComponent={() => (
          <View className="w-full flex justify-center items-center mt-6 mb-12 px-4">
            <TouchableOpacity
              onPress={logout}
              className="flex w-full items-end mb-10"
            >
              <Image
                source={icons.logout}
                resizeMode="contain"
                className="w-6 h-6"
              />
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  )
}

export default Profile;*/ //original code ends here 

//first draft starts here 
/*import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { router } from "expo-router";

import { icons } from "../../constants";
import { signOut } from "../../lib/supabase";
import { useGlobalContext } from "../../context/GlobalProvider";

const Profile = () => {
  const { user, setUser, setIsLoggedIn } = useGlobalContext();

  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLoggedIn(false);

    router.replace("/sign-in");
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ListHeaderComponent={() => (
          <View style={styles.headerContainer}>
            <View style={styles.profileInfoContainer}>
              <Image
                source={icons.profilePlaceholder} // Placeholder icon, you can replace with user's avatar URL if available
                style={styles.avatar}
              />
              <View style={styles.userInfo}>
                <Text style={styles.username}>{user?.username || "Username"}</Text>
                <Text style={styles.email}>{user?.email || "Email"}</Text>
              </View>
            </View>
            <TouchableOpacity onPress={logout} style={styles.logoutButton}>
              <Image source={icons.logout} resizeMode="contain" style={styles.logoutIcon} />
            </TouchableOpacity>
          </View>
        )}
        data={[]} // Add any other settings or options here
        renderItem={null} // Since there are no other items, this is null
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerContainer: {
    alignItems: 'center',
    marginVertical: 20,
    paddingHorizontal: 16,
  },
  profileInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  userInfo: {
    justifyContent: 'center',
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 14,
    color: 'gray',
  },
  logoutButton: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
  },
  logoutIcon: {
    width: 24,
    height: 24,
  },
});

export default Profile;*/ //1st draft ends here 

//this is the second draft 
/*import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import { router } from "expo-router";
import * as ImagePicker from 'expo-image-picker';

import { icons } from "../../constants";
import { signOut } from "../../lib/supabase";
import { useGlobalContext } from "../../context/GlobalProvider";

const Profile = () => {
  const { user, setUser, setIsLoggedIn } = useGlobalContext();
  const [profileImage, setProfileImage] = useState(null);

  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLoggedIn(false);

    router.replace("/sign-in");
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

    if (!pickerResult.canceled) {
      console.log('Selected image URI:', pickerResult.uri);
      setProfileImage(pickerResult.uri);
      // You can also upload the picked image to your server here
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ListHeaderComponent={() => (
          <View style={styles.headerContainer}>
            <View style={styles.profileInfoContainer}>
              <TouchableOpacity onPress={pickImage}>
                <Image
                  source={profileImage ? { uri: profileImage } : icons.profilePlaceholder}
                  style={styles.avatar}
                />
              </TouchableOpacity>
              <View style={styles.userInfo}>
                <Text style={styles.username}>{user?.username || "Username"}</Text>
                <Text style={styles.email}>{user?.email || "Email"}</Text>
              </View>
            </View>
            <TouchableOpacity onPress={logout} style={styles.logoutButton}>
              <Image source={icons.logout} resizeMode="contain" style={styles.logoutIcon} />
            </TouchableOpacity>
          </View>
        )}
        data={[]} // Add any other settings or options here
        renderItem={null} // Since there are no other items, this is null
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerContainer: {
    alignItems: 'center',
    marginVertical: 20,
    paddingHorizontal: 16,
  },
  profileInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  userInfo: {
    justifyContent: 'center',
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 14,
    color: 'gray',
  },
  logoutButton: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
  },
  logoutIcon: {
    width: 24,
    height: 24,
  },
});

export default Profile;*/ //second draft ends here 

//this is the third draft 
/*import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import { router } from "expo-router";
import * as ImagePicker from 'expo-image-picker';

import { icons } from "../../constants";
import { signOut } from "../../lib/supabase";
import { useGlobalContext } from "../../context/GlobalProvider";

const Profile = () => {
  const { user, setUser, setIsLoggedIn } = useGlobalContext();
  const [profileImage, setProfileImage] = useState(null);

  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLoggedIn(false);

    router.replace("/sign-in");
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
      setProfileImage(pickerResult.uri);
      // You can also upload the picked image to your server here
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ListHeaderComponent={() => (
          <View style={styles.headerContainer}>
            <View style={styles.profileInfoContainer}>
              <TouchableOpacity onPress={pickImage}>
                <Image
                  source={profileImage ? { uri: profileImage } : icons.profilePlaceholder}
                  style={styles.avatar}
                />
              </TouchableOpacity>
              <View style={styles.userInfo}>
                <Text style={styles.username}>{user?.username || "Username"}</Text>
                <Text style={styles.email}>{user?.email || "Email"}</Text>
              </View>
            </View>
            <TouchableOpacity onPress={logout} style={styles.logoutButton}>
              <Image source={icons.logout} resizeMode="contain" style={styles.logoutIcon} />
            </TouchableOpacity>
          </View>
        )}
        data={[]} // Add any other settings or options here
        renderItem={null} // Since there are no other items, this is null
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerContainer: {
    alignItems: 'center',
    marginVertical: 20,
    paddingHorizontal: 16,
  },
  profileInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  userInfo: {
    justifyContent: 'center',
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 14,
    color: 'gray',
  },
  logoutButton: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
  },
  logoutIcon: {
    width: 24,
    height: 24,
  },
});

export default Profile;*/ //end of draft 

//fourth draft 
/*
import React, { useState, useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { icons } from '../../constants';
import { signOut } from '../../lib/supabase';
import { useGlobalContext } from '../../context/GlobalProvider';
import { router } from 'expo-router';

const Profile = () => {
  const { user, setUser, setIsLoggedIn } = useGlobalContext();
  const [profileImage, setProfileImage] = useState(null);

  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLoggedIn(false);
    router.replace('/sign-in');
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

    console.log('Picker result:', pickerResult);

    if (!pickerResult.cancelled) {
      console.log('Selected image URI:', pickerResult.assets[0].uri);
      setProfileImage(pickerResult.assets[0].uri);
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
          <Text style={styles.email}>{user?.email || 'Email'}</Text>
        </View>
      </View>
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

export default Profile;*/ //draft ends here 

//fifth draft starts here 
/*import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { icons } from '../../constants';
import { signOut } from '../../lib/supabase';
import { useGlobalContext } from '../../context/GlobalProvider';
import { router } from 'expo-router';

const Profile = () => {
  const { user, setUser, setIsLoggedIn } = useGlobalContext();
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    fetchProfileImage(); // Fetch profile image URI on component mount
  }, []);

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
          <Text style={styles.email}>{user?.email || 'Email'}</Text>
        </View>
      </View>
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

export default Profile;*/ //fifth draft ends here 

//sixth draft starts here 
import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { icons } from '../../constants';
import { signOut } from '../../lib/supabase';
import { useGlobalContext } from '../../context/GlobalProvider';
import { router } from 'expo-router';

const Profile = () => {
  const { user, setUser, setIsLoggedIn } = useGlobalContext();
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    fetchProfileImage(); // Fetch profile image URI on component mount
  }, []);

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
          <Text style={styles.email}>{user?.email || 'Email'}</Text>
        </View>
      </View>

      {/* Middle Section with Placeholder Tabs */}
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
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    paddingHorizontal: 10,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginHorizontal: 5,
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

export default Profile;


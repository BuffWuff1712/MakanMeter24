import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { useGlobalContext } from '../../context/GlobalProvider';
import { getAllFollowers, getAllFollowing } from '../../lib/supabase';
import { icons } from '../../constants';
import { router } from 'expo-router';

const userFriendPage = () => {
  const { user, refresh } = useGlobalContext();
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);
  const translateX = useSharedValue(0);

  useEffect(() => {
    const fetchInfo = async () => {
      const followersData = await getAllFollowers(user);
      setFollowers(followersData);
      const followingData = await getAllFollowing(user);
      setFollowing(followingData);
    };

    fetchInfo();
  }, [refresh]);

  const handleSwitchTab = (index) => {
    translateX.value = withSpring(index * 180, {
      damping: 30,
      stiffness: 250,
    });
    setSelectedTab(index);
  };

  const animatedIndicatorStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  const handleUserClick = async (userID) => {
        router.navigate(
            {pathname: 'userProfile',
            params: { friendID: userID }});
    };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.tabContainer}>
          <TouchableOpacity onPress={() => handleSwitchTab(0)} style={styles.tabButton}>
            <Text style={selectedTab === 0 ? styles.tabActive : styles.tabInactive}>FOLLOWERS</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleSwitchTab(1)} style={styles.tabButton}>
            <Text style={selectedTab === 1 ? styles.tabActive : styles.tabInactive}>FOLLOWING</Text>
          </TouchableOpacity>
        </View>
        <Animated.View style={[styles.indicator, animatedIndicatorStyle]} />
        
        {selectedTab === 0 && (
          <View style={styles.listContainer}>
            {followers.map((follower, index) => (
              <View key={index} style={styles.listItem}>
                <TouchableOpacity 
                  activeOpacity={0.7}
                  onPress={() => handleUserClick(follower.user_id)}
                  style={styles.listItemContent}
                >
                  <Image 
                    source={follower.profile_picture_url ? { uri: follower.profile_picture_url } : icons.profile}
                    style={styles.profilePic}
                    fadeDuration={0}
                  />
                  <Text style={styles.usernameText}>{follower?.username}</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        {selectedTab === 1 && (
          <View style={styles.listContainer}>
            {following.map((followed, index) => (
              <View key={index} style={styles.listItem}>
                <TouchableOpacity 
                  activeOpacity={0.7}
                  onPress={() => handleUserClick(followed.user_id)}
                  style={styles.listItemContent}
                >
                  <Image 
                    source={followed.profile_picture_url ? { uri: followed.profile_picture_url } : icons.profile}
                    style={styles.profilePic}
                    fadeDuration={0}
                  />
                  <Text style={styles.usernameText}>{followed?.username}</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default userFriendPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    padding: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 20,
    justifyContent: 'space-evenly',
  },
  tabButton: {
    paddingHorizontal: 50,
    paddingBottom: 10,
  },
  tabActive: {
    fontWeight: 'bold',
    color: '#007bff',
  },
  tabInactive: {
    fontWeight: 'bold',
    color: '#aaa',
  },
  indicator: {
    position: 'absolute',
    top: 45,
    left: 20,
    width: 175,
    height: 3,
    backgroundColor: '#007bff',
    zIndex: -1,
  },
  listContainer: {
    marginTop: 20,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  listItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  usernameText: {
    fontSize: 16,
    padding: 10,
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});

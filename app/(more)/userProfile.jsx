import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { followFriend, getFollowStatus, getUserDetails, unFollowFriend } from '../../lib/supabase';
import { icons } from '../../constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from 'react-native-paper';
import { useGlobalContext } from '../../context/GlobalProvider';
import StreakBar from '../../components/StreakBar';

const userProfile = () => {
    const { friendID } = useLocalSearchParams();
    const { refresh, user } = useGlobalContext();
    const [profile, setProfile] = useState({});
    const [followStatus, setFollowStatus] = useState(false); 

    useEffect( () => {
        const fetchInfo = async () => {
            const following = await getFollowStatus(user, friendID);
            const data = await getUserDetails(friendID);
            setFollowStatus(following);
            setProfile(data);
        }

        fetchInfo();
    }, [refresh]);

    const handleFollowTap = async () => {
        try {
            if (followStatus) {
                await unFollowFriend(user, friendID);
            } else {
                await followFriend(user, friendID);
            }
            setFollowStatus((prev) => !prev)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <SafeAreaView className='h-full bg-white'>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Image
                    source={profile.profile_picture_url ? { uri: profile.profile_picture_url } : icons.profile}
                    style={styles.profilePic}
                    />
                    <Text style={styles.username}>{profile.username}</Text>
                </View>

                <Text className='my-5'>Hi! I'm using MakanMeter</Text>    
                <View style={styles.statsContainer}>
                    <View style={styles.stats}>
                        <View style={styles.stat}>
                            <Text style={styles.statNumber}>{profile.followers}</Text>
                            <Text style={styles.statLabel}>Followers</Text>
                        </View>
                        <View style={styles.stat}>
                            <Text style={styles.statNumber}>{profile.following}</Text>
                            <Text style={styles.statLabel}>Following</Text>
                        </View>
                    </View>
                    <Button 
                        mode='outlined'
                        textColor='green'
                        theme={{ colors: { primary: 'green' } }}
                        onPress={handleFollowTap}
                        style={styles.followButton}
                    >
                        {followStatus ? 'Followed ✓' : 'Follow +'}
                    </Button>
                </View>
                {/* <View className='items-center mt-10'>
                    <StreakBar totalDays={30}/>
                </View> */}
                
            </View>
            
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    marginTop: -20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePic: {
    width: 70,
    height: 70,
    borderRadius: 50,
  },
  userInfo: {
    marginLeft: 10,
    flex: 1,
  },
  username: {
    marginLeft: 20,
    fontSize: 24,
    fontWeight: 'bold',
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  stats: {
    flexDirection: 'row',
  },
  stat: {
    alignItems: 'center',
    marginRight: 20, // Space between stats
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 14,
    color: '#888',
  },
  followButton: {
    borderColor: 'green',
  },
});

export default userProfile;

import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Text, ActivityIndicator, TouchableOpacity, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; 
import NotificationItem from '../../components/NotificationItem';
import { deleteNotification, getNotifications } from '../../lib/supabase';
import { useGlobalContext } from '../../context/GlobalProvider';
import { ScrollView } from 'react-native';

const NotificationPage = () => {
  const { user, refresh, setRefresh } = useGlobalContext();
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    // Fetch notifications from an API or a local source
    const fetchNotifications = async () => {
      try {
        // Replace with your data fetching logic
        const data = await getNotifications(user);
        setNotifications(data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotifications();
  }, [refresh]);

  const deleteItem = async (id) => {
    try {
      await deleteNotification(id);
      setRefresh((prev) => !prev);
    } catch (error) {
      console.log("Error in notifications page: ", error);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={30} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.header}>Notifications</Text>
      </View>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : notifications.length === 0 ? (
        <View style={styles.noNotificationsContainer}>
          <Text style={styles.noNotificationsText}>No Notifications</Text>
          <Text style={styles.noNotificationsSubText}>Clutter cleared! We'll notify you when there is something new.</Text>
        </View>
      ) : (
        <ScrollView style={styles.listContainer}>
          {notifications.map((item, index) => (
            <View key={index}>
              <NotificationItem item={JSON.stringify(item)} onDelete={deleteItem}/>
            </View>
          ))}
          <View className='my-10'/>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    marginTop: -59,
    marginBottom: -40,
  },
  headerContainer: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50, 
    backgroundColor: '#006400',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    top: 20,
  },
  backButton: {
    position: 'absolute',
    left: 15,
    bottom: 28, 
  },
  listContainer: {
    paddingHorizontal: 10,
    backgroundColor: '#f5f5f5', 
    flex: 1,
    paddingVertical: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noNotificationsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noNotificationsImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  noNotificationsText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  noNotificationsSubText: {
    fontSize: 16,
    color: '#777',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});

export default NotificationPage;

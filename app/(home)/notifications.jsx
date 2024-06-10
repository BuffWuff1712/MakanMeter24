import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; 
import NotificationItem from '../../components/NotificationItem';

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    // Fetch notifications from an API or a local source
    const fetchNotifications = async () => {
      try {
        // Replace with your data fetching logic
        const data = [
          { id: '1', title: 'Notification 1', body: 'This is the first notification', timestamp: '2024-06-04 12:00' },
          { id: '2', title: 'Notification 2', body: 'This is the second notification', timestamp: '2024-06-04 12:05' },
          // Add more dummy notifications here
        ];
        setNotifications(data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const renderItem = ({ item }) => <NotificationItem notification={item} />;

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
      ) : (
        <FlatList
          data={notifications}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff', // Ensure the background color of the SafeAreaView matches the header color
    marginTop: -59,
    marginBottom: -40,
  },
  headerContainer: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50, // Adjust the padding to control the header height
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
    bottom: 28, // Align the back button with the lower header content
  },
  listContainer: {
    padding: 10,
    backgroundColor: '#f5f5f5', // Ensure the list container background color
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default NotificationPage;

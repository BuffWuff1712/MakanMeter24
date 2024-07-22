import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import timeAgo from '../lib/calculations/timeAgo';
import { Feather } from '@expo/vector-icons';
import { ActivityIndicator } from 'react-native-paper';

const NotificationItem = ({ item, onDelete }) => {
  const notification = JSON.parse(item);
  const [loading, setLoading] = useState(false);
  const swipeableRef = useRef(null);

  const handleDelete = async () => {
    setLoading(true);
    await onDelete(notification.id);
    setLoading(false);
    if (swipeableRef.current) {
      swipeableRef.current.close();
    }
  };

  const renderRightActions = () => (
    <View style={styles.rightAction}>
      <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Feather name="trash" size={24} color="white" />
        )}
      </TouchableOpacity>
    </View>
  );

  return (
    <Swipeable ref={swipeableRef} renderRightActions={renderRightActions}>
      <View style={styles.notificationContainer}>
        <Text style={styles.title}>{notification.title}</Text>
        <Text style={styles.body}>{notification.body}</Text>
        <Text style={styles.timestamp}>{timeAgo(notification.created_at)}</Text>
      </View>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  notificationContainer: {
    backgroundColor: 'white',
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  body: {
    fontSize: 14,
    color: '#333',
    marginBottom: 10,
  },
  timestamp: {
    fontSize: 12,
    color: '#999',
  },
  rightAction: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 85,
    height: '100%',
    borderRadius: 10,
  },
  deleteButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    right: 10,
    width: 70,
    height: '85%',
    borderRadius: 10,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default NotificationItem;

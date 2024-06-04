import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const NotificationItem = ({ notification }) => {
  return (
    <View style={styles.notificationContainer}>
      <Text style={styles.title}>{notification.title}</Text>
      <Text style={styles.body}>{notification.body}</Text>
      <Text style={styles.timestamp}>{notification.timestamp}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  notificationContainer: {
    backgroundColor: 'white',
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 2,
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
});

export default NotificationItem;

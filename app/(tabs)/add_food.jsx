import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
  Dimensions,
} from 'react-native';
import React, { useState } from 'react';

const { width, height } = Dimensions.get('window');

const Add_Food = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const handlePress = () => {
    setModalVisible(true);
  };

  const handleClose = () => {
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Add_Food
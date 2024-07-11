// __mocks__/expo-router.js
import React from 'react';
import { Text } from 'react-native';

const router = {
  push: jest.fn(),
};

const Redirect = ({ href }) => <Text>{`Redirect to ${href}`}</Text>;

export { router, Redirect };

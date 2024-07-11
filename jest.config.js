module.exports = {
  preset: 'jest-expo',
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect', './jest.setup.js'],
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules-.*|sentry-expo|native-base|react-native-svg|@expo-router/.*|victory-native|@shopify/react-native-skia)'
  ],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)$': '<rootDir>/__mocks__/fileMock.js',
    '@shopify/react-native-skia': '<rootDir>/__mocks__/react-native-skia.js',
    'victory-native': '<rootDir>/__mocks__/victory-native.js',
    '^../lib/supabase$': '<rootDir>/__mocks__/supabase.js',
    'GlobalProvider' : '<rootDir>/__mocks__/GlobalProvider.js',
    '^@expo/vector-icons$': '<rootDir>/__mocks__/@expo/vector-icons.js',
    'react-native-paper': '<rootDir>/__mocks__/react-native-paper.js',
  },
};

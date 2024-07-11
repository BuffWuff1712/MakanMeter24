import React from 'react';
const actualIcons = jest.requireActual('@expo/vector-icons');
export const Entypo = (props) => <mock-Entypo {...props} />;
export const AntDesign = (props) => <mock-AntDesign {...props} />;
export const FontAwesome5 = (props) => <mock-FontAwesome5 {...props} />;
export default actualIcons;

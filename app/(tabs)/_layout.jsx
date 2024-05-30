import { View, Text, Image, TouchableOpacity, SafeAreaView, useColorScheme, StyleSheet} from 'react-native'
import React, { useEffect, useRef } from 'react'
import { Tabs, Redirect } from 'expo-router';
import * as Animatable from 'react-native-animatable';
import { useTheme } from '@react-navigation/native';
import { useAddFoodButton, AddFoodButtonProvider } from '../../context/AddFoodButtonContext';
import AddFoodButton from '../../components/AddFoodButton';



//import the custom icons from the constants folder
import { icons } from '../../constants';



const TabArr = [
  { route: 'home', label: 'Home', icon: icons.home},
  { route: 'analyse', label: 'Analyse', icon: icons.analyse},
  { route: 'add_food', label: 'Add', icon: icons.plus},
  { route: 'plan', label: 'Plan', icon: icons.plan},
  { route: 'more', label: 'More', icon: icons.more},
];

const animate1 = { 0: { scale: .5, translateY: 7 }, .92: { translateY: -34 }, 1: { scale: 1.2, translateY: -24 } }
const animate2 = { 0: { scale: 1.2, translateY: -24 }, 1: { scale: 1, translateY: 7 } }

const circle1 = { 0: { scale: 0 }, 0.3: { scale: .9 }, 0.5: { scale: .2 }, 0.8: { scale: .7 }, 1: { scale: 1 } }
const circle2 = { 0: { scale: 1 }, 1: { scale: 0 } }



const TabButton = (props) => {
  const { handlePress2 } = useAddFoodButton();
  const { item, onPress, accessibilityState } = props;
  const focused = accessibilityState.selected;
  const viewRef = useRef(null);
  const circleRef = useRef(null);
  const textRef = useRef(null);
  const isDarkMode = useColorScheme() === 'dark';

  const { colors } = useTheme();
  const color = isDarkMode ? "white" : "black";
  const bgColor = colors.background;


  const combinedPressHandler = () => {
    handlePress2();
    if (onPress) {
      onPress();
    }
  };

  useEffect(() => {
    if (focused) {
      viewRef.current.animate(animate1);
      circleRef.current.animate(circle1);
      textRef.current.transitionTo({ scale: 1 });
    } else {
      viewRef.current.animate(animate2);
      circleRef.current.animate(circle2);
      textRef.current.transitionTo({ scale: 0 });
    }
  }, [focused])

  return (
    <TouchableOpacity
      onPress={combinedPressHandler}
      activeOpacity={1}
      style={styles.container}>
      <Animatable.View
        ref={viewRef}
        duration={700}
        style={styles.container}>
        <View style={[styles.btn, { borderColor: bgColor, backgroundColor: bgColor }]}>
          <Animatable.View
            ref={circleRef}
            style={styles.circle} />
          <Image 
            source={item.icon} //Icon Image
            resizeMode="contain"
            tintColor={color}
            className="w-9 h-9" //uses nativewind
          />
        </View>
        <Animatable.Text
          ref={textRef}
          style={[styles.text, { color }]}>
          {item.label}
        </Animatable.Text>
      </Animatable.View>
    </TouchableOpacity>
  )
}


// Tab Layout lays out the tabs
const TabsLayout = () => {
  return (
    
    <AddFoodButtonProvider>
      <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: '#10b981',
          tabBarInactiveTintColor: '#CDCDE0',
          tabBarStyle: {
            backgroundColor: '#FFFFFF',
            height: 84,
          }
        }}
      >
        {TabArr.map((item, index) => {
          return ( item.label === 'Add' ?
          <Tabs.Screen
          key={index} 
          name={item.route} 
          options = {{ 
            title: 'Add',
            headerShown: false,
            tabBarButton: (props) => (
              <AddFoodButton {...props}>
              </AddFoodButton>
            ),
          }}
        /> :
            <Tabs.Screen 
              key={index} 
              name={item.route} 
              options={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarButton: (props) => <TabButton {...props} item={item} />
              }}
            />
          )
        })}
      </Tabs>
      </>
    </AddFoodButtonProvider>
    
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 70,
  },
  tabBar: {
    height: 70,
    position: 'absolute',
    margin: 16,
    borderRadius: 16,
  },
  btn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 4,
    borderColor: '#FFFFFF',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center'
  },
  circle: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#36B37E',
    borderRadius: 25,
  },
  text: {
    fontSize: 12,
    textAlign: 'center',
    color: '#36B37E',
    fontWeight: '500'
  }
})

export default TabsLayout

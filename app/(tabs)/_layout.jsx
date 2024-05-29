import { View, Text, Image, TouchableOpacity, SafeAreaView, useColorScheme, StyleSheet} from 'react-native'
import React, { useEffect, useRef } from 'react'
import { Tabs, Redirect } from 'expo-router';
import * as Animatable from 'react-native-animatable';
import { useTheme } from '@react-navigation/native';

//import the custom icons from the constants folder
import { icons } from '../../constants';

// Tab Icon dictates how the tab icons would look
const TabIcon = ( { icon, color, name, focused }) => {
  return (
    <View className="items-center justify-center gap-2">
      <Image 
        source={icon} //Icon Image
        resizeMode="contain"
        tintColor={color}
        className="w-9 h-9" //uses nativewind
      />

      {/* <Text className={`${focused ? 'font-psemibold' : 
      'font-pregular'} text-xs`} style={{ color: color }}>
        {name} 
      </Text>  */}
    </View>
  )
}

const CustomTabBarButton = ({ children, onPress }) => (
  <TouchableOpacity
    className="justify-center items-center"
    style={{
      top: -15, // This will make the button protrude out of the tab bar
    }}
    activeOpacity={0.9}
    onPress={onPress}
    
  >
    <View className="w-[70px] h-[70px] rounded-full bg-green-600 
    shadow-lg justify-center items-center">
      {children}
    </View>
  </TouchableOpacity>
);


// Tab Layout lays out the tabs
const TabsLayout = () => {
  return (
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
        <Tabs.Screen
          name="home"
          options = {{ 
            title: 'Home',
            headerShown: false,
            tabBarIcon: ({ color, focused}) => (
              <TabIcon
                icon={icons.home}
                color={color}
                name="Home"
                focused={focused} 
              />
            )
          }}
        />

        <Tabs.Screen
          name="analyse"
          options = {{ 
            title: 'Analyse',
            headerShown: false,
            tabBarIcon: ({ color, focused}) => (
              <TabIcon
                icon={icons.analyse}
                color={color}
                name="Analyse"
                focused={focused} 
              />
            )
          }}
        />
        
        <Tabs.Screen
          name="add_food"
          options = {{ 
            title: 'Add',
            headerShown: false,
            tabBarIcon: ({ color, focused}) => (
              <TabIcon
                icon={icons.plus}
                color={color}
                name="Add"
                focused={focused} 
              />
            ),
            tabBarButton: (props) => (
              <CustomTabBarButton {...props}>
                <Image
                  source={icons.plus}
                  resizeMode="contain"
                  style={{ tintColor: '#ffffff' }}
                  className="w-[60px] h-[60px]" // larger icon size with Tailwind
                />
              </CustomTabBarButton>
            ),
          }}
        />
        
        <Tabs.Screen
          name="plan"
          options = {{ 
            title: 'Plan',
            headerShown: false,
            tabBarIcon: ({ color, focused}) => (
              <TabIcon
                icon={icons.plan}
                color={color}
                name="Plan"
                focused={focused} 
              />
            )
          }}
        />

        <Tabs.Screen
          name="more"
          options = {{ 
            title: 'More',
            headerShown: false,
            tabBarIcon: ({ color, focused}) => (
              <TabIcon
                icon={icons.more}
                color={color}
                name="More"
                focused={focused} 
              />
            )
          }}
        />
      </Tabs>
    </>
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
    justifyContent: 'center',
    alignItems: 'center'
  },
  circle: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#637aff',
    borderRadius: 25,
  },
  text: {
    fontSize: 12,
    textAlign: 'center',
    backgroundColor: '#637aff',
    fontWeight: '500'
  }
})

export default TabsLayout

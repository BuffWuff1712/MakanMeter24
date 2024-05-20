import { View, Text, ScrollView, Image, Alert } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, router } from 'expo-router';
import { images } from '../../constants';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';

const SignIn = () => {

  return (
    <SafeAreaView className="bg-gray h-full">
      <ScrollView>
        
        <View className="w-full justify-center min-h-[83vh] 
        px-4 my-6">
          <Image 
                source={images.logoSmall}
                resizeMode='contain'
                className="w-[105px] h-[100px]" 
          />
          <Text className="text-2xl text-black
          text-semibold mt-10 font-psemibold">
            Log in to MakanMeter
          </Text>

          <FormField 
            title="Email"
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <FormField 
            title="Password"
            otherStyles="mt-7"
          />    

          <CustomButton 
            title="Sign In"
            containerStyles="mt-7"
          />

          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-black-100 font-pregular">
              Don't have an account?
            </Text>
            <Link href="/sign-up" className="text-lg
            font-psemibold text-secondary">
              Sign Up
            </Link>
          </View>

          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-black-100 font-pregular">
              Jump to
            </Text>
            <Link href="../(tabs)/home" className="text-lg
            font-psemibold text-secondary">
              Home
            </Link>
          </View>
        </View>

        
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn
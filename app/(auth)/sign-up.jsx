import { View, Text, ScrollView, Image, Alert } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, router } from 'expo-router';
import { images } from '../../constants';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';

const SignUp = () => {
  
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
            Sign up to MakanMeter
          </Text>

          <FormField 
            title="Username"
            otherStyles="mt-10"
          />

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
            title="Sign Up"
            containerStyles="mt-7"
          />

          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-black-100 font-pregular">
              Have an account already?
            </Text>
            <Link href="/sign-in" className="text-lg
            font-psemibold text-secondary">
              Log In
            </Link>
          </View>
        </View>

        
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp;
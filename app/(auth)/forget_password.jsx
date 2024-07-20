import { Alert, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomButton from '../../components/CustomButton';
import { FontAwesome5 } from '@expo/vector-icons';
import { router } from 'expo-router';
import { TextInput } from 'react-native';
import { sendPasswordReset, supabase } from '../../lib/supabase';

const forgetPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [isSubmitting, setSubmitting] = useState(false);

    const submit = async () => {
        if (email === "") {
          Alert.alert("Error", "Please fill in all fields");
          return;
        }
    
        setSubmitting(true);
    
        try {
          await sendPasswordReset(email);
          Alert.alert('Check your inbox or junk for the password reset link.');
          router.back();
        } catch (error) {
          console.log("Error", error.message);
        } finally {
          setSubmitting(false);
        }
    };

    return (
        <SafeAreaView className='h-full'>
            <View className='justify-center p-5'>
                <TouchableOpacity activeOpacity={0.7} onPress={() => {router.back()}}>
                    <FontAwesome5 name="arrow-left" size={24} color="black" />
                </TouchableOpacity>
            </View>
            
            <View className='justify-center p-5'>
                <View>
                    <Text className='text-xl font-bold'>Recover your password</Text>
                </View>
                
                <View>
                    <Text className='text-base text-gray-500'>We'll email you a link to reset your password </Text>
                </View>

                <View className="border-2 border-slate-200 
                    w-full h-16 px-4 my-5 bg-gray-50 rounded-2xl 
                    focus:border-secondary items-center flex-row"> 
                    <TextInput 
                        className='flex-1 text-black font-psemiboldtext-base'
                        placeholder='Email address'
                        value={email}
                        onChangeText={setEmail}
                    />
                </View>

                <CustomButton 
                    title="Reset"
                    containerStyles="bg-emerald"
                    handlePress={submit}
                    isLoading={isSubmitting}
                />
                
            </View>
        </SafeAreaView>
        
    )
}

export default forgetPasswordPage

const styles = StyleSheet.create({})
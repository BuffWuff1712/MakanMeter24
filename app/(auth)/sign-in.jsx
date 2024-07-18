import { View, Text, ScrollView, Image, Alert, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, router } from 'expo-router';
import { images } from '../../constants';
import { getCurrentUser, signIn } from "../../lib/supabase";
import { useGlobalContext } from "../../context/GlobalProvider";
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';

const SignIn = () => {
  const { setUser, setIsLoggedIn } = useGlobalContext();
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const submit = async () => {
    if (form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setSubmitting(true);

    try {
      await signIn(form.email, form.password);
      const result = await getCurrentUser();
      setUser(result);
      setIsLoggedIn(true);

      // Alert.alert("Success", "User signed in successfully");
      router.replace("/home");
    } catch (error) {
      Alert.alert("Error: ", error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView testID="sign-in-page" className="bg-gray h-full">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className="w-full justify-center min-h-[83vh] px-4 my-6">
            <Image
              source={images.logoSmall}
              resizeMode='contain'
              className="w-[105px] h-[100px]"
            />
            <Text className="text-2xl text-black text-semibold mt-10 font-psemibold">
              Log in to MakanMeter
            </Text>

            <FormField
              testID="email-input"
              title="Email"
              value={form.email}
              handleChangeText={(e) => setForm({ ...form, email: e })}
              otherStyles="mt-7"
              keyboardType="email-address"
            />

            <FormField
              testID="password-input"
              title="Password"
              value={form.password}
              handleChangeText={(e) => setForm({ ...form, password: e })}
              otherStyles="mt-7"
            />

            <View className='px-2 items-end my-5'>
              <TouchableOpacity onPress={() => { router.navigate('forget_password') }}>
                <Text className='text-emerald font-semibold'>Forgot Password?</Text>
              </TouchableOpacity>
            </View>

            <CustomButton
              testID="login-button"
              title="Login"
              containerStyles="bg-emerald"
              handlePress={submit}
              isLoading={isSubmitting}
            />

            <View className="justify-center pt-5 flex-row gap-2">
              <Text className="text-lg text-black-100 font-pregular">
                Don't have an account?
              </Text>
              <Link href="/sign-up" className="text-lg font-psemibold text-emerald">
                Sign Up
              </Link>
            </View>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default SignIn;

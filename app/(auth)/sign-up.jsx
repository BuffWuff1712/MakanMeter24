import { View, Text, ScrollView, Image, Alert } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, router } from 'expo-router';
import { images } from '../../constants';
import { createUser } from "../../lib/supabase";
import { useGlobalContext } from "../../context/GlobalProvider";
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';


const SignUp = () => {
  const { setUser, setIsLoggedIn } = useGlobalContext();

  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const submit = async () => {
    if (form.username === "" || form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
    }

    setSubmitting(true);
    try {
      const result = await createUser(form.email, form.password, form.username);
      setUser(result);
      setIsLoggedIn(true);

      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setSubmitting(false);
    }
  };

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
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles="mt-10"
          />

          <FormField 
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <FormField 
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />    

          <CustomButton 
            title="Sign Up"
            containerStyles="mt-7 bg-emerald"
            handlePress={submit}
            isLoading={isSubmitting}
          />

          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-black-100 font-pregular">
              Have an account already?
            </Text>
            <Link href="/sign-in" className="text-lg
            font-psemibold text-emerald">
              Log In
            </Link>
          </View>
        </View>

        
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp;
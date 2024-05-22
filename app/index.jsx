import { StatusBar } from 'expo-status-bar';
import { ScrollView, Text, View, Image } from 'react-native';
import { Redirect, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../constants';
import CustomButton from '../components/CustomButton';

export default function App() {
  
  return (
    <SafeAreaView className="bg-white-150 h-full">
      <ScrollView contentContainerStyle={{ height: '100%'}}>
        <View className="w-full justify-center
        items-center min-h-[85vh] px-4">

          {/*Image of Logo*/}
          <Image
            source={images.logo}
            className="w-[500px] h-[120px]"
            resizeMode="contain" 
          />

          <View className="relative mt-5">
            <Text className="text-2xl text-black 
          font-bold text-center">
              Start Your Journey Today with {' '}
              <Text className="text-green-600">MakanMeter</Text>
            </Text>
          </View>

          <Text className="text-sm font-pregular 
          text-black-100 mt-7 text-center">
            Where creativity meets innovation: 
            Start Your Journey Today To Health with MakanMeter
          </Text>

          <CustomButton 
            title="Continue with Email"
            handlePress={() => router.push('/sign-in')}
            containerStyles="w-full mt-7 bg-secondary"
          />
        </View>
      </ScrollView>

      <StatusBar backgroundColor='#161622' style='dark'/>
    </SafeAreaView>
  );
}



import { CameraView, useCameraPermissions } from 'expo-camera';
//import * as MediaLibrary from 'expo-media-library';
import { useRef, useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import ShutterButton from '../../components/ShutterButton';
import { icons, images } from '../../constants';
import { router } from 'expo-router';
import LeftArrow from '../../components/LeftArrow';
import FlipButton from '../../components/FlipButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import Results from './results';

const CameraScreen = () => {
    const [facing, setFacing] = useState('back');
    const [permission, requestPermission] = useCameraPermissions();
    const [isCameraReady, setIsCameraReady] = useState(false);
    //const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState(null);
    const cameraRef = useRef(null);

    if (!permission) {
        // Camera permissions are still loading.
        return <View />;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet.
        return (
        <View style={styles.container}>
            <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
            <Button onPress={requestPermission} title="grant permission" />
        </View>
        );
    }

    function toggleCameraFacing() {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    }

    const handleCameraReady = () => {
        setIsCameraReady(true);
        console.log('Camera is ready!');
        // Perform any other actions needed once the camera is ready
      };
    
    const handleMountError = (error) => {
    console.error('Camera mount error:', error);
    };
    
    const takePicture = async () => {
        if (cameraRef.current && isCameraReady) {
            const photo = await cameraRef.current.takePictureAsync();
            console.log("success!")
            router.replace('/results')
        }
      };

    const returnHome = () => {
        router.back();
    };

    return (
        <SafeAreaView className="flex-1 justify-center">
            <View>
                <LeftArrow
                    handlePress={returnHome}
                />
            </View>

            <CameraView 
                className="flex-1"
                facing={facing}
                ref={cameraRef}
                onCameraReady={handleCameraReady}
                onMountError={handleMountError}
            />

            <View className="justify-center items-center flex-row">
                <Text className="text-lg font-bold">
                        Press the camera button to scan
                </Text>
            </View>

            <View className="mt-8 backgroundColor-transparent 
            justify-center items-center flex-row">
                <ShutterButton
                    handlePress={takePicture}
                />

                <FlipButton
                    handlePress={toggleCameraFacing}
                />
            </View>
        </SafeAreaView>
    );
}

    const styles = StyleSheet.create({
    buttonContainer: {
        marginTop: 10,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default CameraScreen;


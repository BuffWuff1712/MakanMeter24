import { CameraView, useCameraPermissions } from 'expo-camera';
//import * as MediaLibrary from 'expo-media-library';
import { useRef, useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, 
    Image, ActivityIndicator, Modal, 
    Alert} from 'react-native';
import ShutterButton from '../../components/ShutterButton';
import { router, useLocalSearchParams } from 'expo-router'
import FlipButton from '../../components/FlipButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import { analyse } from '../../lib/openAI';
import { encodeImage } from '../../components/ImageProcessor';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { PinchGestureHandler, State } from 'react-native-gesture-handler';


const barcodeScannerScreen = () => {
    const { meal_type } = useLocalSearchParams();
    const [facing, setFacing] = useState('back');
    const [permission, requestPermission] = useCameraPermissions();
    const [isCameraReady, setIsCameraReady] = useState(false);
    const [isLoading, setIsLoading] = useState(false); // Loading state
    const [errorMessage, setErrorMessage] = useState(''); // Error message state
    const [zoomLevel, setZoomLevel] = useState(0);
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
    
    // Pick Image from photo library
    const pickImage = async () => {
        try {
          let result = await ImagePicker.requestMediaLibraryPermissionsAsync();
          if (!result.granted) {
            Alert.alert('Permission to access camera roll is required!');
            return;
          }
      
          let pickerResult = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });
      
          if (!pickerResult.canceled) {
            const base64Image = await encodeImage(pickerResult.assets[0].uri);
            console.log("Barcode processed!");
            //analysePhoto(base64Image);
          }
        } catch (error) {
          console.error("Error picking image: ", error);
          Alert.alert('Something went wrong while picking the image. Please try again.');
        }
      };

    // Takes a picture of the food
    const takePicture = async () => {
        if (cameraRef.current && isCameraReady) {
            try {
                const photo = await cameraRef.current.takePictureAsync();
    
                // Process the photo
                const base64Image = await encodeImage(photo.uri);
                console.log("Barcode processed!")
    
                // Now you can use the base64Image as needed
                //analysePhoto(base64Image);
    
            } catch (error) {
                console.error("Error taking picture:", error);
            }
        }
    };

    // TO USE ONLY AFTER WE HAVE FINALISED APP - analyse image of the food
    // const analysePhoto = async (photo) => {
    //     try {
    //         setIsLoading(true); // Show loading screen
    //         const jsonData = await analyse(photo);
    //         console.log('(From camera.jsx) Returned json: ', jsonData);
    //         // Navigate to results page with jsonData
    //         router.push({
    //             pathname: '/results',
    //             params: { data: JSON.stringify(jsonData), meal_type: meal_type }
    //         });
    //     } catch (error) {
    //         console.log('Failed to analyze photo:', error);
    //         setErrorMessage('Failed to analyze photo. Please try again.');
    //     } finally {
    //         setIsLoading(false); // Hide loading screen
    //     }
    // };

    // TO DUMMY REQUEST API APP - analyse image of the food
    const analysePhoto = (photo) => {
        try {
            setIsLoading(true); // Show loading screen
            const jsonData = {
                "possible_dish_names": [
                  "grilled chicken wings",
                  "satay skewers",
                  "satay sauce",
                  "stir-fried oyster omelette",
                  "lime soda",
                  "iced tea",
                  "grilled meat skewers",
                  "white radish",
                  "cucumber slices",
                  "spicy dipping sauce"
                ]
            };

            console.log(jsonData);
            
            // Navigate to results page with jsonData
            router.push({
                pathname: '/results',
                params: { data: JSON.stringify(jsonData), meal_type: meal_type}
            });
        } catch (error) {
            console.log('Failed to analyze photo:', error);
            setErrorMessage('Failed to analyze photo. Please try again.');
        } finally {
            setIsLoading(false); // Hide loading screen
        }
    };

    // returns user to home page
    const goBack = () => {
        router.back();
    };

    return (
        <SafeAreaView className="flex-1 justify-center">
            {isLoading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#0000ff" />
                    <Text style={styles.loadingText}>Analyzing photo...</Text>
                </View>
                ) : (
                <>
                    
                    <View className="flex-row p-5 mx-1">
                        <TouchableOpacity onPress={goBack}>
                            <FontAwesome5 name="arrow-left" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                    
                        
                    <CameraView
                        className="flex-1"
                        facing={facing}
                        ref={cameraRef}
                        zoom={zoomLevel}
                        autofocus='off'
                        onCameraReady={handleCameraReady}
                        onMountError={handleMountError}
                        barcodeScannerSettings={{barcodeTypes: ['ean8','ean13', 'upc_a', 'upc_e']}}
                        onBarcodeScanned={(info) => {console.log('barcode info: ',info)}}
                    >
                    </CameraView>

                    <View className="justify-center items-center flex-row">
                        <Text className="text-lg font-bold p-4">
                        Press the scanner button to scan
                        </Text>
                    </View>
                    <View className="justify-between items-center flex-row mx-10">
                        <TouchableOpacity activeOpacity={0.7} onPress={pickImage}>
                            <FontAwesome name="photo" size={45} color="black" />
                        </TouchableOpacity>
                        <ShutterButton handlePress={takePicture} />
                        <FlipButton handlePress={toggleCameraFacing} />
                    </View>
                </>
            )}

            <Modal
                visible={!!errorMessage}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setErrorMessage('')}
            >
                <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalText}>{errorMessage}</Text>
                    <TouchableOpacity
                    style={styles.modalButton}
                    onPress={() => setErrorMessage('')}
                    >
                    <Text style={styles.modalButtonText}>Try Again</Text>
                    </TouchableOpacity>
                </View>
                </View>
            </Modal>
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

    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    loadingText: {
        marginTop: 10,
        fontSize: 18,
        color: '#000',
    },

    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
      
    modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    },

    modalText: {
    fontSize: 18,
    marginBottom: 20,
    },
    
    modalButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
    },
    
    modalButtonText: {
    color: 'white',
    fontSize: 16,
    },
});

export default barcodeScannerScreen;


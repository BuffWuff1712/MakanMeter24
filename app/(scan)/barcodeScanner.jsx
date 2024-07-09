import { CameraView, useCameraPermissions } from 'expo-camera';
//import * as MediaLibrary from 'expo-media-library';
import React, { useRef, useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, 
    Image, ActivityIndicator, Modal, 
    Alert,
    TextInput,
    TouchableWithoutFeedback,
    Keyboard} from 'react-native';
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router'
import FlipButton from '../../components/FlipButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign, FontAwesome, FontAwesome5, Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { getBarcodeInfo } from '../../lib/nutritionix';
import ZoomSlider from '../../components/ZoomSlider';


const barcodeScannerScreen = () => {
    const { meal_type } = useLocalSearchParams();
    const [facing, setFacing] = useState('back');
    const [permission, requestPermission] = useCameraPermissions();
    const [isCameraReady, setIsCameraReady] = useState(false);
    const [isCameraActive, setIsCameraActive] = useState(true);
    const [isSearching, setIsSearching] = useState(false);
    const [isLoading, setIsLoading] = useState(false); // Loading state
    const [showModal, setShowModal] = useState(false);
    const [flashStatus, setFlashStatus] = useState('off');
    const [barcode, setBarcode] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // Error message state
    const [zoomLevel, setZoomLevel] = useState(0);
    const cameraRef = useRef(null);


    useFocusEffect(
        React.useCallback(() => {
            setIsCameraActive(true);
            return () => {
                // Cleanup action when screen loses focus
                setIsCameraActive(false);
            };
        }, [])
    );

    if (!permission) {
        // Camera permissions are still loading.
        return <View />;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet.
        return (
            <SafeAreaView className='h-full justify-center'>
                <View style={styles.container}>
                    <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
                    <Button onPress={requestPermission} title="Grant Permission" />
                </View>
            </SafeAreaView>
        );
    }

    function toggleFlash() {
        setFlashStatus(current => (current === 'off' ? 'on' : 'off'))
    }

    const handleCameraReady = () => {
        setIsCameraReady(true);
        console.log('Camera is ready!');
        // Perform any other actions needed once the camera is ready
      };
    
    const handleMountError = (error) => {
        console.error('Camera mount error:', error);
    };
    
    const handleBarcodePress = () => {
        setShowModal(true);
    };

    
    const handleSearch = async (barcode) => {
        if (isSearching) return; // Prevent multiple calls
        
        if (barcode.length >= 6) {
            setIsSearching(true); // Set search in progress
            setIsLoading(true);
            setIsCameraActive(false);
            setShowModal(false);
            // console.log('Search:', barcode);
            try {
                // const data = await getBarcodeInfo(barcode);
                const data = { nf_calories: 884, food_name: 'Oreo', nf_total_carbohydrate: 0, nf_total_fat: 100, nf_dietary_fiber: 0, nf_protein: 0, saturated_fat: 2.63, polyunsaturated_fat: 6.74, monounsaturated_fat: 8.82, cholesterol: 251.56, sodium: 1881.87, potassium: 1284.34, sugars: 25.59, vitamin_a: 170.93, vitamin_c: 77.91, vitamin_d: 3.43, calcium: 905.62, iron: 16.69, zinc: 1.88, vitamin_b12: 1.01, magnesium: 387.74, serving_qty: 1 };
                // console.log(data);

                router.navigate({
                    pathname: '/results',
                    params: { data: JSON.stringify(data), meal_type: meal_type }
                });

                
            } catch (error) {
                console.error('Error during search:', error);
                setErrorMessage('Failed to fetch data. Please try again.');
            } finally {
                setIsLoading(false);
                setIsSearching(false); // Reset search state
            }
        } else {
            Alert.alert('Please input a valid barcode');
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
                    
                    {isCameraActive &&
                    <CameraView
                        className="flex-1 items-center justify-center"
                        facing={facing}
                        ref={cameraRef}
                        zoom={zoomLevel}
                        autofocus='off'
                        enableTorch={true}
                        flash={flashStatus}
                        onCameraReady={handleCameraReady}
                        onMountError={handleMountError}
                        barcodeScannerSettings={{barcodeTypes: ['ean8','ean13', 'upc_a', 'upc_e']}}
                        onBarcodeScanned={(info) => {handleSearch(info.data)}}
                    >   
                        <View style={styles.barcodeBox}>
                            <Text style={styles.scanText}>Scan barcode here</Text>
                        </View>

                        <View style={styles.sliderContainer}>
                            <ZoomSlider func={setZoomLevel}/>
                        </View>
                        </CameraView>

                    }
                    
                    
                    <View className="justify-between items-center flex-row mx-10 mt-5 bg-transparent bg-opacity-50">
                        <TouchableOpacity activeOpacity={0.7} onPress={handleBarcodePress}>
                            <FontAwesome name="pencil-square-o" size={45} color="black" />
                        </TouchableOpacity>
                        <></>
                        <TouchableOpacity activeOpacity={0.7} onPress={toggleFlash}>
                            <Ionicons name="flash-off" size={45} color="black" />
                        </TouchableOpacity>
                    </View>

                    
                </>
            )}

            <Modal
                animationType="slide"
                transparent={true}
                visible={showModal}
                onRequestClose={() => setShowModal(false)}
            >
                <TouchableOpacity 
                    style={styles.modalOverlay} 
                    onPress={() => setShowModal(false)}
                    activeOpacity={1}
                >
                    <View style={styles.modalView}>
                        <TextInput
                            style={styles.textInput}
                            keyboardType="numeric"
                            autoFocus
                            placeholder="Enter barcode number"
                            value={barcode}
                            onChangeText={setBarcode}
                        />
                        <TouchableOpacity style={styles.searchButton} onPress={() => {handleSearch(barcode)}}>
                            <Text style={styles.searchButtonText}>Search</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>

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

    sliderContainer: {
        position: 'absolute',
        right: 0,
        transform: [
            { rotate: '270deg' }, 
            { translateY: 170 },
            { translateX: 0 }],  // Adjust this value to center the slider vertically
    },

    barcodeBox: {
        width: 250,
        height: 250,
        borderWidth: 3,
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 5,
        borderColor: '#fff',
    },

    scanText: {
        color: '#fff',
    },

    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },

    modalView: {
        flexDirection: 'row',
        top: 100,
        width: '100%',
        backgroundColor: '#fff',
        padding: 20,
        alignItems: 'center',
    },

    textInput: {
        width: '80%',
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 10,
    },

    searchButton: {
        backgroundColor: '#2196F3',
        padding: 10,
        borderRadius: 10,
    },

    searchButtonText: {
        color: '#fff',
    },
});

export default barcodeScannerScreen;


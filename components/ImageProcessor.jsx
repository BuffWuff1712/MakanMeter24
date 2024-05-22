import * as ImageManipulator from 'expo-image-manipulator'
import * as FileSystem from 'expo-file-system'

export async function encodeImage(uri) {
    try {
        // Check image file size
        const fileInfo = await FileSystem.getInfoAsync(uri);
        const fileSizeInBytes = fileInfo.size;

        // Check if file size exceeds 20MB
        const maxFileSizeInBytes = 20 * 1024 * 1024; // 20MB
        if (fileSizeInBytes > maxFileSizeInBytes) {
            throw new Error('Image size exceeds 20MB limit.');
        }

        // Resize image if necessary (optional)
        const resizedImage = await ImageManipulator.manipulateAsync(
            uri,
            [{ resize: { width: 500 } }],
            { compress: 0.7, format: 'jpeg' } // Adjust compression and format as needed
        );

        // Read the resized image file
        const imageFile = await FileSystem.readAsStringAsync(resizedImage.uri, {
            encoding: FileSystem.EncodingType.Base64,
        });

        return imageFile;
    } catch (error) {
        console.error('Error encoding image:', error);
        throw error;
    }
}




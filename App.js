// Importing necessary modules and components from React, Expo, and React Native
import { useState, useRef } from 'react'; // React hooks for state and references
import { StatusBar } from 'expo-status-bar'; // Status bar from Expo
import { StyleSheet, View, Platform } from 'react-native'; // Core components and utilities from React Native
import * as ImagePicker from 'expo-image-picker'; // Image picker module from Expo
import { GestureHandlerRootView } from "react-native-gesture-handler"; // Gesture handler root view from React Native Gesture Handler
import * as MediaLibrary from 'expo-media-library'; // Media library module from Expo
import { captureRef } from 'react-native-view-shot'; // Capture view references as images
import domtoimage from 'dom-to-image'; // Library to convert DOM nodes to images

// Importing custom components
import Button from './components/Button'; // Custom button component
import ImageViewer from './components/ImageViewer'; // Custom image viewer component
import CircleButton from './components/CircleButton'; // Custom circular button component
import IconButton from './components/IconButton'; // Custom icon button component
import EmojiPicker from './components/EmojiPicker'; // Custom emoji picker component
import EmojiList from './components/EmojiList'; // Custom emoji list component
import EmojiSticker from './components/EmojiSticker'; // Custom emoji sticker component

// Importing a placeholder image
const PlaceholderImage = require('./assets/images/background-image.png'); // Placeholder image for the image viewer

// Main functional component of the app
export default function App() {
  // Defining state variables using useState hook
  const [isModalVisible, setIsModalVisible] = useState(false); // Controls the visibility of the emoji picker modal
  const [showAppOptions, setShowAppOptions] = useState(false); // Toggles between showing app options or not
  const [pickedEmoji, setPickedEmoji] = useState(null); // Holds the selected emoji
  const [selectedImage, setSelectedImage] = useState(null); // Holds the URI of the selected image
  const [status, requestPermission] = MediaLibrary.usePermissions(); // Media library permissions
  const imageRef = useRef(); // Reference to the image view

  // Request permissions if not already granted
  if (status === null) {
    requestPermission();
  }

  // Function to pick an image from the gallery
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true, // Allows the user to edit the image before selecting
      quality: 1, // Sets the quality of the selected image
    });

    // If an image is selected, update the state variables
    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri); // Set the selected image URI
      setShowAppOptions(true); // Show app options
    } else {
      alert('You did not select any image.'); // Alert the user if no image is selected
    }
  };

  // Function to reset the app options
  const onReset = () => {
    setShowAppOptions(false); // Hide app options
  };

  // Function to show the emoji picker modal
  const onAddSticker = () => {
    setIsModalVisible(true); // Show the emoji picker modal
  };

  // Function to close the emoji picker modal
  const onModalClose = () => {
    setIsModalVisible(false); // Hide the emoji picker modal
  };

  // Function to save the image (to be implemented later)
  const onSaveImageAsync = async () => {
    if (Platform.OS !== 'web') {
      try {
        const localUri = await captureRef(imageRef, {
          height: 440, // Height of the captured image
          quality: 1, // Quality of the captured image
        });

        await MediaLibrary.saveToLibraryAsync(localUri); // Save the image to the media library
        if (localUri) {
          alert("Saved!"); // Alert the user that the image has been saved
        }
      } catch (e) {
        console.log(e); // Log any errors
      }
    } else {
      try {
        const dataUrl = await domtoimage.toJpeg(imageRef.current, {
          quality: 0.95, // Quality of the generated JPEG
          width: 320, // Width of the generated image
          height: 440, // Height of the generated image
        });

        let link = document.createElement('a'); // Create a download link
        link.download = 'sticker-smash.jpeg'; // Set the filename for the download
        link.href = dataUrl; // Set the href to the data URL
        link.click(); // Trigger the download
      } catch (e) {
        console.log(e); // Log any errors
      }
    }
  };

  // Rendering the UI components
  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.imageContainer}>
        <View ref={imageRef} collapsable={false}>
          <ImageViewer placeholderImageSource={PlaceholderImage} selectedImage={selectedImage} />
          {pickedEmoji !== null ? <EmojiSticker imageSize={40} stickerSource={pickedEmoji} /> : null}
        </View>
      </View>      
      {showAppOptions ? (
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <IconButton icon="refresh" label="Reset" onPress={onReset} />
            <CircleButton onPress={onAddSticker} />
            <IconButton icon="save-alt" label="Save" onPress={onSaveImageAsync} />
          </View>
        </View>
      ) : (
        <View style={styles.footerContainer}>
          <Button theme="primary" label="Choose a photo" onPress={pickImageAsync} />
          <Button label="Use this photo" onPress={() => setShowAppOptions(true)} />
        </View>
      )}
      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
        <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
      </EmojiPicker>
      <StatusBar style="light" />
    </GestureHandlerRootView>
  );
}

// Defining styles using StyleSheet
const styles = StyleSheet.create({
  container: {
    flex: 1, // Takes up the entire screen
    backgroundColor: '#25292e', // Background color
    alignItems: 'center', // Aligns items in the center horizontally
  },
  imageContainer: {
    flex: 1, // Takes up the remaining space
    paddingTop: 58, // Padding from the top
  },
  footerContainer: {
    flex: 1 / 3, // Takes up one-third of the screen
    alignItems: 'center', // Aligns items in the center horizontally
  },
  optionsContainer: {
    position: 'absolute', // Positioned absolutely
    bottom: 80, // 80 units from the bottom
  },
  optionsRow: {
    alignItems: 'center', // Aligns items in the center horizontally
    flexDirection: 'row', // Arranges items in a row
    justifyContent: 'center', // Centers items in the row
  },
});

import { Button, StyleSheet, Text, View, Alert, Image } from "react-native";
import React, { useState } from "react";
import { launchCameraAsync, useCameraPermissions } from "expo-image-picker";

const ImageManager = () => {
  const [permissionResponse, requestPermission] = useCameraPermissions();
  const [imageUri, setImageUri] = useState("");

  const verifyPermissions = async () => {
    if (permissionResponse?.granted) return true;

    const responseAfterRequest = await requestPermission();

    if (responseAfterRequest?.granted) return true;
    return false;
  };

  const takeImageHandler = async () => {
    try {
      const hasPermission = await verifyPermissions();
      if (!hasPermission) {
        Alert.alert(
          "Permission Required",
          "Please grant permission to access the media library"
        );
        return;
      }
      const result = await launchCameraAsync({
        allowsEditing: true,
        quality: 0.2,
      });
      if (result.canceled) return;
      setImageUri(result.assets[0].uri);
    } catch (error) {
      console.log("Error taking image", error);
    }
  };

  return (
    <View>
      <Button title="Take Photo" onPress={takeImageHandler} />
      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
    </View>
  );
};

export default ImageManager;

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
    marginVertical: 8,
    borderRadius: 4,
  },
});

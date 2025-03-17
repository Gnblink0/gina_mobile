import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { launchCameraAsync, useCameraPermissions } from 'expo-image-picker'

const ImageManager = () => {
  const [permissionResponse, requestPermission] = useCameraPermissions();

  const verifyPermissions = async () => {
    if (permissionResponse?.granted) return true

    const responseAfterRequest = await requestPermission()
    
    if (responseAfterRequest?.granted) return true;
    return false;
  }
  
  const takeImageHandler = async () => {
    try {
      verifyPermissions()
      const image = await launchCameraAsync({
        allowsEditing: true,
        aspect: [16, 9],
        quality: 1,
      })
      console.log(image)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View>
      <Button title="Take Photo" onPress={takeImageHandler} />
    </View>
  )
}

export default ImageManager

const styles = StyleSheet.create({})
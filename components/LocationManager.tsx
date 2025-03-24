import { StyleSheet, Text, View, Button, Alert } from 'react-native'
import React from 'react'
import { getCurrentPositionAsync, useForegroundPermissions } from 'expo-location'

const LocationManager = () => {
  const [permissionResponse, requestPermission] = useForegroundPermissions();

  const verifyPermissions = async () => {
    if (permissionResponse?.granted) return true;

    const responseAfterRequest = await requestPermission();

    if (responseAfterRequest?.granted) return true;
    return false;
  };

  const locateUserHandler = async () => {
    try {
      const hasPermission = await verifyPermissions();
      if (!hasPermission){
        Alert.alert("Permission not granted", "Please grant permission to use location services");
        return;
      }
      const response = await getCurrentPositionAsync();
      const location = response.coords;
      console.log(location);
      const { latitude, longitude } = location;
      console.log(latitude, longitude);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View>
      <Button title="Find My Location" onPress={locateUserHandler} />
    </View>
  );
};

export default LocationManager

const styles = StyleSheet.create({})
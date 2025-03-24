import { StyleSheet, Text, View, Button, Alert, Image } from "react-native";
import React, { useState } from "react";
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
} from "expo-location";
import { router } from "expo-router";

const LocationManager = () => {
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [permissionResponse, requestPermission] = useForegroundPermissions();

  const verifyPermissions = async () => {
    if (permissionResponse?.granted) return true;

    const responseAfterRequest = await requestPermission();

    if (responseAfterRequest?.granted) return true;
    return false;
  };

  const chooseLocationHandler = () => {
    router.navigate("map");
  };

  const locateUserHandler = async () => {
    try {
      const hasPermission = await verifyPermissions();
      if (!hasPermission) {
        Alert.alert(
          "Permission not granted",
          "Please grant permission to use location services"
        );
        return;
      }
      const response = await getCurrentPositionAsync();
      const location = response.coords;
      setLocation({
        latitude: location.latitude,
        longitude: location.longitude,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View>
      <Button title="Find My Location" onPress={locateUserHandler} />
      <Button title="Go to Map" onPress={chooseLocationHandler} />
      {location && (
        <Image
          style={styles.mapImage}
          source={{
            uri: `https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=600&height=400&center=lonlat:${location?.longitude},${location?.latitude}&zoom=12&apiKey=${process.env.EXPO_PUBLIC_GEOAPIFY_API_KEY}`,
          }}
        />
      )}
    </View>
  );
};

export default LocationManager;

const styles = StyleSheet.create({
  mapImage: {
    flex: 1,
  },
});

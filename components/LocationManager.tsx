import { StyleSheet, Text, View, Button, Alert, Image } from "react-native";
import React, { useState, useEffect } from "react";
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
} from "expo-location";
import { router, useLocalSearchParams } from "expo-router";

const LocationManager = () => {
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [permissionResponse, requestPermission] = useForegroundPermissions();
  const params = useLocalSearchParams();
  console.log("params", params);

  useEffect(() => {
    if (params.lat && params.lng) {
      const newLat = Number(params.lat);
      const newLng = Number(params.lng);

      // Only update if values are different
      if (location?.latitude !== newLat || location?.longitude !== newLng) {
        setLocation({
          latitude: newLat,
          longitude: newLng,
        });
      }
    }
  }, [params, location]);

  const verifyPermissions = async () => {
    if (permissionResponse?.granted) return true;

    const responseAfterRequest = await requestPermission();

    if (responseAfterRequest?.granted) return true;
    return false;
  };

  const chooseLocationHandler = () => {
    if (location?.latitude && location?.longitude) {
      router.navigate({
        pathname: "map",
        params: {
          lat: location.latitude,
          lng: location.longitude,
        },
      });
    } else {
      router.navigate("map");
    }
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
      {location?.latitude && location?.longitude && (
        <View>
          <Text>Latitude: {location?.latitude}</Text>
          <Text>Longitude: {location?.longitude}</Text>
          <Image
            style={styles.mapImage}
            source={{
              uri: `https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=600&height=400&center=lonlat:${location?.longitude},${location?.latitude}&zoom=12&apiKey=${process.env.EXPO_PUBLIC_GEOAPIFY_API_KEY}`,
            }}
          />
        </View>
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

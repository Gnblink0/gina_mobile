import { StyleSheet, Text, View, Button, Alert, Image } from "react-native";
import React, { useState, useEffect } from "react";
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
} from "expo-location";
import { router, useLocalSearchParams } from "expo-router";
import { writeToDB, readDocFromDB } from "@/Firebase/firestoreHelper";
import { User } from "@/types";
import { auth } from "@/Firebase/firebaseSetup";

const LocationManager = () => {
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [permissionResponse, requestPermission] = useForegroundPermissions();
  const params = useLocalSearchParams();

  useEffect(() => {
    async function fetchUserData(){
      if (auth.currentUser?.uid){
        try {
          const user = await readDocFromDB(auth.currentUser?.uid as string, "users");
          if (user?.address?.geo){
            setLocation({
              latitude: user.address.geo.latitude,
              longitude: user.address.geo.longitude,
            });
          }
        } catch (error) {
          console.log("Error fetching user data:", error);
        }
      }
    }
    fetchUserData();
  }, []);

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

      const userId = auth.currentUser?.uid;
      if (!userId) {
        console.log("No authenticated user");
        return;
      }

      writeToDB(
        {
          address: {
            geo: {
              latitude: location.latitude,
              longitude: location.longitude,
            },
          },
        } as User,
        "users",
        userId
      );
      router.replace("/");
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

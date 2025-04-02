import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { Button } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
const map = () => {
  const params = useLocalSearchParams();
  const initialLocation = {
    latitude: params.lat ? Number(params.lat) : 37.78825,
    longitude: params.lng ? Number(params.lng) : -122.4324,
  };
  // console.log("initialLocation", initialLocation);
  const [selectedLocation, setSelectedLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(initialLocation);
  const pickLocationHandler = () => {
    // console.log("selectedLocation", selectedLocation);
    if (selectedLocation) {
      router.replace({
        pathname: "profile",
        params: {
          lat: selectedLocation.latitude,
          lng: selectedLocation.longitude,
        },
      });
    }
  };
  return (
    <View>
      <MapView
        style={styles.map}
        onPress={(e) => {
          setSelectedLocation({
            latitude: e.nativeEvent.coordinate.latitude,
            longitude: e.nativeEvent.coordinate.longitude,
          });
        }}
        initialRegion={{
          latitude: initialLocation.latitude,
          longitude: initialLocation.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{
            latitude: selectedLocation?.latitude ?? initialLocation.latitude,
            longitude: selectedLocation?.longitude ?? initialLocation.longitude,
          }}
        />
      </MapView>
      <View style={styles.buttonContainer}>
        {selectedLocation && (
          <Button title="Pick Location" onPress={pickLocationHandler} />
        )}
      </View>
    </View>
  );
};

export default map;

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "80%",
  },
  buttonContainer: {},
});

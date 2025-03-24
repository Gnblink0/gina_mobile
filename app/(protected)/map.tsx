import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { Button } from "react-native";
import { router } from "expo-router";
const map = () => {
  const [selectedLocation, setSelectedLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const pickLocationHandler = () => {
    if (selectedLocation) {
      router.navigate({
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
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{
            latitude: selectedLocation?.latitude ?? 37.78825,
            longitude: selectedLocation?.longitude ?? -122.4324,
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

import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import MapView, { Marker } from 'react-native-maps'

const map = () => {
  const [selectedLocation, setSelectedLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
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
    </View>
  );
}

export default map

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
})

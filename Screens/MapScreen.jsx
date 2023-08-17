import React from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

const MapScreen = () => (
  <View style={styles.container}>
    <MapView
      style={{ flex: 1 }}
      initialRegion={{
        longitude: -122.02661807,
        latitude: 37.32655157,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      }}
    >
      <Marker
        coordinate={{ longitude: -122.02661807, latitude: 37.32655157 }}
      />
    </MapView>
  </View>
);

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: "center" 
},
});

export default MapScreen;
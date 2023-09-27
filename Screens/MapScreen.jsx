import { useEffect } from 'react';
import { View, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

const MapScreen = ({ route,  setTabBarStyle }) => {
  // const {
  //   photo,
  //   namePost,
  //   location: { latitude, longitude },
  // } = params;
  const coordinates = route.params;
  console.log("coordinates:", coordinates)

  useEffect(() => {
    setTabBarStyle('none');

    return () => {
      setTabBarStyle('flex');
    };
  });

  return (<View style={styles.container}>
    <MapView
      style={styles.map}
      initialRegion={{
        longitude: -122.02661807,
        latitude: 37.32655157,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      }}
        mapType="standard"
        // minZoomLevel={10}
        onMapReady={() => console.log("Map is ready")}
        // onRegionChange={() => console.log("Region change1")}
    >
      <Marker
        coordinate={{ longitude: -122.02661807, latitude: 37.32655157 }}
        description=""
      />
    </MapView>
  </View>)
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: "center" 
},
map: {
  ...StyleSheet.absoluteFillObject,
  flex: 1,
},
});

export default MapScreen;
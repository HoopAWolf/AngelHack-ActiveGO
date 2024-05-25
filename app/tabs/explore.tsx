import React, { useState, useEffect } from 'react';
import MapView, { Marker, Callout } from 'react-native-maps';
import { StyleSheet, View, Text } from 'react-native';
import * as Location from 'expo-location';

export default function App() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [mapRef, setMapRef] = useState<MapView | null>(null);
  const searching = false

  const [markers, setMarkers] = useState([
    { id: 1, title: 'BLK 64a Commonwealth', coordinate: { latitude: 1.2991835976134736, longitude: 103.79657305825769 },
     count: 10, free: true, type: 0, name: 'BLK 64a Commonwealth' },
    { id: 2, title: 'BLK 65 Commonwealth', coordinate: { latitude: 1.2996205624351878, longitude: 103.79687908989848 },
     count: 10, free: true, type: 0, name: 'BLK 65 Commonwealth' },
    { id: 3, title: 'BLK 63 Commonwealth', coordinate: { latitude: 1.2988528664723906, longitude: 103.79713333649674 },
     count: 10, free: true, type: 0, name: 'BLK 63 Commonwealth' },
    { id: 4, title: 'Chess', coordinate: { latitude: 1.2985073314629263, longitude: 103.79710212352771 },
     count: 10, free: false, type: 1, name: 'BLK 62 Commonwealth' }
  ]);

  const [types, setTypes] = useState([
    { color: 'green'},
    { color: 'blue'},
    { color: 'orange'}
  ])

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission denied');
        return;
      }

      try {
        let currentLocation = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
          timeInterval: 5000 // 5 seconds
        });
        setLocation(currentLocation);
        if (mapRef) {
          mapRef.setCamera({
            center: {
              latitude: currentLocation.coords.latitude,
              longitude: currentLocation.coords.longitude
            },
            zoom: 16, // Specify the desired zoom level
          });
        }
      } catch (error) {
        console.error('Error getting current location:', error.message);
      }
    })();
  }, [mapRef]); // Added mapRef as a dependency

  return (
    <View style={styles.container}>
      {location ? (
        <MapView 
          style={styles.map} 
          showsUserLocation={true} 
          ref={ref => setMapRef(ref)} // Set the mapRef when the MapView is rendered
        >
          {markers.map(marker => (
            marker.free == searching && (
            <Marker
              key={marker.id}
              coordinate={marker.coordinate}
              title={marker.title}
              description={"Capacity: " + marker.count }  
              pinColor={types[marker.type].color}>
            
              <View style={styles.marker}>
                <Text style={styles.markerText}>{marker.title}</Text>
                <View style={[styles.pin, { backgroundColor: types[marker.type].color }]} />
              </View>
            </Marker>
          )
          ))} 
        </MapView>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  marker: {
    alignItems: 'center',
  },
  markerText: {
    marginBottom: 5,
    fontWeight: 'bold',
    backgroundColor: 'white',
    padding: 2,
    borderRadius: 3,
    overflow: 'hidden',
  },
  pin: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'black',
  },
});

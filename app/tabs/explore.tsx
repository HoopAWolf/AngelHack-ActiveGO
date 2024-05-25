import React, { useState, useEffect } from 'react';
import MapView, { Marker, Callout } from 'react-native-maps';
import { StyleSheet, View, Text } from 'react-native';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage'

class LocationDetail{
  constructor(id:number, name:string, eventDes:string, date:Date, duration:Float, capacity:number, count:number, members:number[], longitude:Float, latitude:Float, eventType:number) {
    this.id = id
    this.name = name;
    this.eventDes = eventDes
    this.date = date;
    this.duration = duration
    this.capacity = capacity;
    this.count = count
    this.members = members
    this.longitude = longitude
    this.latitude = latitude
    this.eventType = eventType
  }
  // Method to create a Person object from JSON
  static fromJSON(json) {
    return new LocationDetail(json.id, json.name, json.eventDes, json.date, json.duration, json.capacity, json.count, json.members, json.longitude, json.latitude, json.evenType);
  }
}

export default function App() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [mapRef, setMapRef] = useState<MapView | null>(null);

  const [types, setTypes] = useState([
    { color: 'green'},
    { color: 'blue'},
    { color: 'orange'}
  ])
  const [allData, setAllData] = useState<LocationDetail[]>()

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('allData');
      if (value !== null) {
        console.log("value: ", value);
        const parsedObj = JSON.parse(value);
        await setAllData(parsedObj)
        console.log('array: ' + allData)
      }
    } catch (e) {
      console.log("Error: ",e);
    }
  };

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
      getData()
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
          {allData && allData.map(marker => (
            <Marker
              key={marker.id}
              coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
              title={marker.name}
              description={"Capacity: " + marker.capacity }  
              pinColor={types[marker.eventType].color}>
            
              <View style={styles.marker}>
                <Text style={styles.markerText}>{marker.name}</Text>
                <View style={[styles.pin, { backgroundColor: types[marker.eventType].color }]} />
              </View>
            </Marker>
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

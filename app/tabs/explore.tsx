import React, { useState, useEffect, useRef } from 'react';
import MapView, { Marker, Callout } from 'react-native-maps';
import { StyleSheet, View, Text, Dimensions, Animated, Alert, Image, ImageBackground, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ThemedView } from '@/components/ThemedView';

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

const { height } = Dimensions.get('window');

let markerTitle = 'unknown marker';
let markerCapacity = 0;
let markerSet = false;
let markerCount = 0;
let markerType = -1
let markerDes = ''
let markerId = -1
let markerDuration = -1

export default function App() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [mapRef, setMapRef] = useState<MapView | null>(null);

  const [types, setTypes] = useState([
    { color: 'green'},
    { color: 'blue'},
    { color: 'orange'}
  ])
  let [allData, setAllData] = useState<LocationDetail[]>()

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

  const [modalVisible, setModalVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(height)).current; // Initial position off-screen (bottom)

  const openModal = () => {
    setModalVisible(true);
    Animated.timing(slideAnim, {
      toValue: 0, // Move to the top of the screen
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeModal = () => {
    Animated.timing(slideAnim, {
      toValue: height, // Move back to the bottom of the screen
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setModalVisible(false); // Close modal after animation
    });
  };
  
  const storeData = async (obj:LocationDetail[]) => {
    try {
      await AsyncStorage.setItem('allData', JSON.stringify(obj));
    } catch (e) {
      console.log("Error: ",e);
    }
  };

  const updateItemCount = (id, new_count) => {
    let updatedData = allData
    let item = updatedData.find(item => item.id === id);
    if (item) {
      item.count = new_count;
    }

    setAllData(updatedData);
  };

  return (
    <View style={styles.container}>
      {location ? (
        <View style={{flex: 1}}>
          <MapView 
            style={styles.map} 
            showsUserLocation={true} 
            ref={ref => setMapRef(ref)} // Set the mapRef when the MapView is rendered
            onPress={() => {
              markerTitle = "unknown";
              markerCapacity = -1;
              markerSet = false;
              closeModal();
            }}
            onPanDrag={() => {
              markerTitle = "unknown";
              markerCapacity = -1;
              markerSet = false;
              closeModal();
            }}
          >
            {allData && allData.map(marker => (
              <Marker
                key={marker.id}
                coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
                title={marker.name}
                description={"Capacity: " + marker.capacity }  
                pinColor={types[marker.eventType].color}
                onPress={() => {
                  markerId = marker.id
                  markerTitle = marker.name;
                  markerCapacity = marker.capacity;
                  markerCount = marker.count
                  markerType = marker.eventType
                  markerSet = true;
                  markerDes = marker.eventDes
                  markerDuration = marker.duration
                  openModal();
                }}>
              
                <View style={styles.marker}>
                  <Text style={styles.markerText}>{marker.name}</Text>
                  <View style={[styles.pin, { backgroundColor: types[marker.eventType].color }]} />
                </View>
              </Marker>
            ))} 
          </MapView>
          
          <View style={{backgroundColor: 'rgba(0, 0, 0, 0)', width: '100%'}}>
            { 
              modalVisible && (
              <Animated.View style={[styles.modalView, { transform: [{ translateY: slideAnim }]}]}>
                <ThemedView style={{height: '90%', width: '100%', alignContent: 'center', justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0)'}}>
                  <ImageBackground
                    source={require('../../assets/images/BG Card.png')}
                    style={{alignContent: 'space-evenly', paddingVertical: 20, paddingHorizontal: 10, marginHorizontal: 15, marginVertical: 15}}
                    imageStyle={{ borderRadius: 25 }}>
                    <Text style={{fontSize: 24, marginVertical: 10}}>{'Name: ' + markerTitle}</Text>
                    {markerType === 1 && <Text style={{fontSize: 24, marginVertical: 10}}>{'Description: ' + markerDes}</Text>}
                    {markerType === 0 && (<Text style={{fontSize: 24, marginVertical: 10}}>{'Capacity: ' + markerCapacity}</Text>)}
                    {markerType === 1 && (<Text style={{fontSize: 24, marginVertical: 10}}>{'Count/Capacity: ' + markerCount + '/' + markerCapacity}</Text>)}
                    {markerType === 1 && (<Text style={{fontSize: 24, marginVertical: 10}}>{'Duration: ' + markerDuration}</Text>)}
                    {markerType === 1 && (
                      <View style={{alignItems: 'center', justifyContent: 'center'}}>
                      <TouchableOpacity style={{width: '50%', backgroundColor: 'rgba(255, 128, 128, 1)', padding: 10, alignItems: 'center', justifyContent: 'center', borderRadius: 25}} onPress={() => {
                        if(markerType === 1)
                        {
                          if(markerCount < markerCapacity)
                          {
                            updateItemCount(markerId, markerCount += 1)
                            if(allData)
                              storeData(allData)
                            getData()
                          }
                          else
                            alert('Activity is full')
                        }
                      }}>
                        <Text style={{fontSize: 20}}>Join Event</Text>
                      </TouchableOpacity>
                      </View>)}
                    
                  </ImageBackground>
                </ThemedView>
              </Animated.View>
            )}
          </View>
        </View>
      ) : (
        <View style={{flex:1, justifyContent: 'center', alignSelf: 'center'}}>
          <Text style={{fontWeight: 'bold', fontSize: 40}}>Loading...</Text>
        </View>
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

  modalContainer: {
    flex: 1, 
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: 10,
  },
  modalView: {
    position: 'relative',
    bottom: 0,
    width: '100%',
    height: height/2.75,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
});

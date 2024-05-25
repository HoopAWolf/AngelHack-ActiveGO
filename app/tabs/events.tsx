import { Image, StyleSheet, View, Text, TouchableOpacity, TextInput, Dimensions, Animated, ImageBackground } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Button } from 'react-native-paper';
import { useState, useEffect, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Float } from 'react-native/Libraries/Types/CodegenTypes';
import * as Location from 'expo-location';
import MapView, { Marker, Callout } from 'react-native-maps';
import { ThemedView } from '@/components/ThemedView';

const { height } = Dimensions.get('window');

let markerTitle = 'unknown marker';
let markerCapacity = 0;
let markerSet = false;
let markerCount = 0;
let markerType = -1
let markerDes = ''
let markerId = -1
let markerDuration = -1
let markerDate = ''

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

export default function EventScreen() {
  const [index, setIndex] = useState(0);
  const [date, setDate] = useState(new Date());
  const [name, setName] = useState('');
  const [capacity, setCapacity] = useState(0);
  const [duration, setDuration] = useState(0);
  const [formattedDate, setFormattedDate] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [allData, setAllData] = useState<LocationDetail[]>()
  const [mapRef, setMapRef] = useState<MapView | null>(null);
  const [location, setLocation] = useState<Location.LocationObject | null>(null);

  const [types, setTypes] = useState([
    { color: 'green'},
    { color: 'blue'},
    { color: 'orange'}
  ])
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

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('allData');
      if (value !== null) {
        console.log("value: ",value);
        const parsedObj = JSON.parse(value);
        await setAllData(parsedObj)
      }
    } catch (e) {
      console.log("Error: ",e);
    }
  };

  const handleHostPress = () => {
    setIndex(1);
  };

  const handleJoinPress = () => {
    setIndex(2);
  };

  const handleBackPress = () => {
    setIndex(0);
  };

  const handleFindLocationPress = () => {
    if(formattedDate && name && capacity != 0 && duration != 0)
      setIndex(3)
    else
      alert('Incomplete details!')
  }

  const handleDateTimeOnClick = () => {
    setShowDatePicker(true);
  };

  const handleDateChange = (event, selectedDate) => {
    if (event.type === 'dismissed') {
      setShowDatePicker(false);
    } else {
      const currentDate = selectedDate || date;
      setShowDatePicker(false);
      setDate(currentDate);
      setShowTimePicker(true);
    }
  };

  const handleTimeChange = (event, selectedTime) => {
    if (event.type === 'dismissed') {
      setShowTimePicker(false);
    } else {
      const currentTime = selectedTime || date;
      const updatedDate = new Date(date.setHours(currentTime.getHours(), currentTime.getMinutes()));
      setShowTimePicker(false);
      setDate(updatedDate);
      setFormattedDate(updatedDate.toLocaleString());
    }
  };

  const handleTextInputChange = (text) => {
    setName(text);
  };

  const handleCapacityInputChange = (text) => {
    setCapacity(Number.parseInt(text));
  };

  const handleDurationInputChange = (text) => {
    setDuration(Number.parseInt(text));
  };

  const updateObj = (id, obj:LocationDetail) => {
    let updatedData = allData
    let item = updatedData.find(item => item.id === id);
    if (item) {
      item = obj;
    }

    setAllData(updatedData);
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
  }, [showDatePicker, mapRef]);

  return (
    (index === 0 && (
      <View style={styles.container}>
        <View style={styles.title_container}>
          <View style={styles.text_container}>
            <Text style={styles.title}>Events</Text>
          </View>
        </View>
        <Image 
          source={require('../../assets/images/events_start_icon.png')}
          style={styles.image}
        />
        <Button style={styles.button} labelStyle={styles.button_text} icon="pencil" mode="contained" onPress={handleHostPress}>
          Host
        </Button>
        <Button style={styles.button} labelStyle={styles.button_text} icon="login" mode="contained" onPress={handleJoinPress}>
          Join
        </Button>
      </View>
    )) || (index === 1 && (
      <View style={styles.container}>
        <View style={styles.title_container}>
          <TouchableOpacity onPress={handleBackPress}>
            <Image
              source={require('../../assets/images/back_button.png')}
              style={styles.back_image}
            />
          </TouchableOpacity>
          <View style={styles.text_container}>
            <Text style={styles.title}>Events</Text>
          </View>
        </View>
        <TextInput
          style={styles.textField}
          placeholder="Name of event"
          placeholderTextColor="#999"
          onChangeText={handleTextInputChange}
        />
        <TextInput
          style={styles.textField}
          placeholder="Capacity"
          placeholderTextColor="#999"
          keyboardType="numeric"
          onChangeText={handleCapacityInputChange}
        />
        <TextInput
          style={styles.textField}
          placeholder="Duration"
          placeholderTextColor="#999"
          keyboardType="numeric"
          onChangeText={handleDurationInputChange}
        />
        <Text style={styles.textField}>
          {formattedDate === 'Invalid Date' || formattedDate === '' ? 'Date not set yet' : formattedDate}
        </Text>
        <Button style={styles.button} labelStyle={styles.button_text} icon="pencil" mode="contained" onPress={handleDateTimeOnClick}>
          Set Date Time
        </Button>
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}
        {showTimePicker && (
          <DateTimePicker
            value={date}
            mode="time"
            display="default"
            onChange={handleTimeChange}
          />
        )}
      <Button style={styles.button} labelStyle={styles.button_text} icon="pencil" mode="contained" onPress={handleFindLocationPress}>
        Find Location
      </Button>
      </View>
    )) || (index === 2 && (
      <View style={styles.container}>
        <View style={styles.title_container}>
          <TouchableOpacity onPress={handleBackPress}>
            <Image
              source={require('../../assets/images/back_button.png')}
              style={styles.back_image}
            />
          </TouchableOpacity>
          <View style={styles.text_container}>
            <Text style={styles.title}>Events</Text>
          </View>
        </View>
      </View>
    )) || (index === 3 && (
      <View style={styles.map_container}>
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
              marker.capacity >= capacity && marker.eventType === 0 && (
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
                  if(marker.date)
                    markerDate = marker.date.toLocaleString()
                  openModal();
                }}>
              
                <View style={styles.marker}>
                  <Text style={styles.markerText}>{marker.name}</Text>
                  <View style={[styles.pin, { backgroundColor: types[marker.eventType].color }]} />
                </View>
              </Marker>
              )
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
                    {markerType === 1 && (<Text style={{fontSize: 24, marginVertical: 5}}>{'Description: ' + markerDes}</Text>)}
                    {markerType === 0 && (<Text style={{fontSize: 24, marginVertical: 10}}>{'Capacity: ' + markerCapacity}</Text>)}
                    {markerType === 1 && (<Text style={{fontSize: 24, marginVertical: 5}}>{'Count/Capacity: ' + markerCount + '/' + markerCapacity}</Text>)}
                    {markerType === 1 && (<Text style={{fontSize: 24, marginVertical: 5}}>{'Duration: ' + markerDuration}</Text>)}
                    {markerType === 1 && (<Text style={{fontSize: 24, marginVertical: 5}}>{'Date: ' + markerDate}</Text>)}
                    {markerType === 0 && (
                      <View style={{alignItems: 'center', justifyContent: 'center'}}>
                      <TouchableOpacity style={{width: '50%', backgroundColor: 'rgba(255, 128, 128, 1)', padding: 10, alignItems: 'center', justifyContent: 'center', borderRadius: 25}} onPress={() => {
                        if(markerType === 0)
                        {
                          if(capacity < markerCapacity)
                          {
                            let item = allData.find(item => item.id === markerId);
                            item.eventType = 1
                            item.eventDes = name
                            item.capacity = capacity
                            item.duration = duration
                            item.date = date
                            item.count = 0
                            setModalVisible(false)
                            updateObj(markerId, item)
                            if(allData)
                              storeData(allData)
                            getData()
                            alert('Event created successfully')
                            setIndex(0)
                          }
                          else
                            alert('Activity is full')
                        }
                      }}>
                        <Text style={{fontSize: 20}}>Host Event</Text>
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
    ))
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  map_container: {
    flex: 1,
  },
  title_container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 50,
    justifyContent: 'space-between',
    marginTop: 100,
  },
  text_container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 45,
    fontWeight: 'bold',
  },
  back_image: {
    width: 50,
    height: 50,
  },
  button: {
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  date_time_button: {
    marginTop: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button_text: {
    marginTop: 15,
    textAlign: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    fontSize: 20,
  },
  image: {
    width: 150,
    height: 150,
    marginTop: 20,
    marginBottom: 20,
  },
  textField: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 5,
    padding: 10,
    width: '50%',
    textAlign: 'left',
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

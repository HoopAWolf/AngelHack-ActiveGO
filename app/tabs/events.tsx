import { Image, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Button } from 'react-native-paper';
import { useState} from 'react'

export default function EventScreen() {
  const [index, setIndex] = useState<Number>(0);

  const handleHostPress = () => {
    setIndex(1);
  };

  const handleJoinPress = () => {
    setIndex(1);
    console.log('join pressed');
    //temp
  };

  const handleBackPress = () => {
    console.log('back pressed');
    setIndex(0);
  };

  return (
    (index == 0 && (
      <View style={styles.container}>
        <View style={styles.title_container}>
          <View style={styles.text_container}>
            <Text style={styles.title}>Events</Text>
          </View>
        </View>
        <Image 
          source={require('../../assets/images/events_start_icon.png')} // Use the correct relative path
          style={styles.image}
        />
        <Button style={styles.button} labelStyle={styles.button_text} icon="pencil" mode="contained" onPress={handleHostPress}>
          Host
        </Button>
        <Button style={styles.button} labelStyle={styles.button_text} icon="login" mode="contained" onPress={handleJoinPress}>
          Join
        </Button>
      </View>
    )) || (index == 1 && (
      <View style={styles.container}>
        <View style={styles.title_container}>
          <TouchableOpacity onPress={handleBackPress}>
            <Image
              source={require('../../assets/images/back_button.png')} // Use the correct relative path
              style={styles.back_image}
            />
          </TouchableOpacity>
          <View style={styles.text_container}>
            <Text style={styles.title}>Events</Text>
          </View>
        </View>
        {/* Rest of your content */}
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
  title_container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 50,
    justifyContent: 'space-between',
    marginTop: 100,
  },
  text_container: {
    flex: 1, // To make the text container take remaining space
    alignItems: 'center',
  },
  title: {
    fontSize: 45,
    fontWeight: 'bold',
  },
  separator: {
    width: 30, // Adjust the width as needed
  },
  back_image: {
    width: 50, // Set appropriate width
    height: 50, // Set appropriate height
  },
  button:{
    marginTop:50,
    alignItems:'center',
    justifyContent:'center',
  },
  button_text:{
    marginTop:15,
    textAlign:'center',
    alignSelf:'center',
    justifyContent:'center',
    fontSize:20,
  },
  image: {
    width: 150, // Set appropriate width
    height: 150, // Set appropriate height
    marginTop: 20, // Space between the image and buttons
    marginBottom: 20, // Space between the image and buttons
  },
});

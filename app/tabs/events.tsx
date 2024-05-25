import { Image, StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Button } from 'react-native-paper';
import { useState, useEffect } from 'react';

export default function EventScreen() {
  const [index, setIndex] = useState(0);
  const [date, setDate] = useState(new Date());
  const [formattedDate, setFormattedDate] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleHostPress = () => {
    setIndex(1);
  };

  const handleJoinPress = () => {
    setIndex(2);
  };

  const handleBackPress = () => {
    setIndex(0);
  };

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

  useEffect(() => {
    if (!showDatePicker && showTimePicker) {
      setShowTimePicker(false);
    }
  }, [showDatePicker]);

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
        />
        <TextInput
          style={styles.textField}
          placeholder="Capacity"
          placeholderTextColor="#999"
          keyboardType="numeric"
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
      <Button style={styles.button} labelStyle={styles.button_text} icon="pencil" mode="contained">
        Submit
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
});

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DateTimeComponent = () => {
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    // Function to update the current date
    const updateDate = () => {
      const date = new Date();
      const formattedDate = formatDate(date);
      setCurrentDate(formattedDate);
    };

    // Update the date initially
    updateDate();

    // Set up interval to update the date every second
    const intervalId = setInterval(updateDate, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  // Function to format the date
  const formatDate = (date) => {
    const options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <Text style={styles.dateText}>{currentDate}</Text>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default DateTimeComponent;
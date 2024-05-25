import React, { useState, useRef, useEffect } from 'react';
import { Image, StyleSheet, TouchableOpacity, View, Text, TextInput, Animated, Dimensions } from 'react-native';
import { ThemedText } from '@/components/ThemedText';

const { height } = Dimensions.get('window');

export default function SocialScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(height)).current; // Initial position off-screen (bottom)

  useEffect(() => {
    // Trigger the modal to open when the component is mounted
    openModal();
  }, []);

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

  // Sample friend data
  const friends = [
    { name: 'Chee Mun', icon: require('../../assets/images/social_icon.png') },
    { name: 'Devin', icon: require('../../assets/images/social_icon.png') },
    { name: 'Hui Sheng', icon: require('../../assets/images/social_icon.png') },
    { name: 'Adrian', icon: require('../../assets/images/social_icon.png') },
    // Add more friend data as needed
  ];

  return (
    <View style={styles.container}>
      {modalVisible && (
        <Animated.View style={[styles.modalView, { transform: [{ translateY: slideAnim }] }]}>
          <TouchableOpacity style={styles.button} activeOpacity={0.5} onPress={closeModal}>
            <Image
              source={require('../../assets/images/close_button.png')}
              style={styles.backButton}
            />
          </TouchableOpacity>
          <TextInput
            style={styles.textField}
            placeholder="Search Friends"
            placeholderTextColor="#999"
          />
          <ThemedText type="title" style={styles.friendTitle}>Friends</ThemedText>
          {friends.map((friend, index) => (
            <View style={styles.friendContainer} key={index}>
              <View style={styles.friendInfo}>
                <Image
                  source={friend.icon}
                  style={styles.friendIcon}
                />
                <Text style={styles.friendName}>{friend.name}</Text>
              </View>
            </View>
          ))}
          <TouchableOpacity style={styles.addButton} activeOpacity={0.5}>
            <Image
              source={require('../../assets/images/invite_button.png')}
              style={styles.addButtonIcon}
            />
          </TouchableOpacity>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: 10,
  },
  modalView: {
    position: 'relative',
    bottom: 0,
    width: '100%',
    height: height,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 50, // Adjusted to accommodate the height of the back button
    padding: 10,
    zIndex: 1,
  },
  button: {
    position: 'absolute', // Positioned absolutely
    top: 10, // Adjusted to position at the top left
    left: 10, // Adjusted to position at the top left
    padding: 10,
  },
  addButton: {
    position: 'relative', // Positioned relatively
    alignItems: 'center',
    padding: 20,
  },
  backButton: {
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
  friendTitle: {
    padding: 20,
  },
  friendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    width: '50%'
  },
  friendInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  friendIcon: {
  },
  friendName: {
    marginLeft: 10,
    fontSize: 16,
  },
  addButtonIcon: {
  },
});

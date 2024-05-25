import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, Animated, Dimensions, Image, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import DateTimeComponent from '@/components/DateTime';
import RewardsPointsComponent from '@/components/RewardsPointsComponent';
import ChallengesClearedComponent, { modifyChallengesClearedCountPoints } from '@/components/ChallengesClearedComponent';
import PointsEarnedComponent from '@/components/PointsEarnedComponent';
import HealthPointComponent, { modifyHealthPoints } from '@/components/HealthPointsComponent';

const { height } = Dimensions.get('window');

export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(height)).current; // Initial position off-screen (bottom)

  const openModal = () => {
    setModalVisible(true);
    Animated.timing(slideAnim, {
      toValue: -600, // Move to the top of the screen
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
    <ThemedView style={styles.overallContainer}>
      <ThemedView style={styles.profileSection}>
        <Image
          source={require('../../assets/images/FACE LX.png')}
          style={styles.profileImage}
        />
        <ThemedView style={styles.profileNameSection}>
          <ThemedText style={styles.profileNameText}>Lin Bae Xin</ThemedText>
          <DateTimeComponent />
        </ThemedView>
      </ThemedView>

      <ThemedView style={styles.scoreSection}>
        <ThemedView style={styles.scoreLumpLump}>
          <ThemedView style={styles.scoreLump}>
            <Image
              source={require('../../assets/images/ICON Heart.png')}
              style={styles.scoreIcon}
            />
            <HealthPointComponent />
          </ThemedView>
          <ThemedText style={{fontSize: 20, color: '#000000'}}>Healthpoints</ThemedText>
        </ThemedView>
        <ThemedView style={styles.scoreLumpLump}>
          <ThemedView style={styles.scoreLump}>
            <Image
              source={require('../../assets/images/ICON Gift.png')}
              style={styles.scoreIcon}
            />
            <RewardsPointsComponent />
          </ThemedView>
          <ThemedText style={{fontSize: 20, color: '#000000'}}>Rewards</ThemedText>
        </ThemedView>
      </ThemedView>

      <ThemedView style={styles.buttonsSection}>
        <TouchableOpacity style={styles.buttonButton} onPress={openModal}>
          <Image
            source={require('../../assets/images/BUTTON Friends.png')}
            style={styles.buttonImage}>
          </Image>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonButton} onPress={() => {modifyChallengesClearedCountPoints(1)}}>
          <Image
            source={require('../../assets/images/BUTTON Challenges.png')}
            style={styles.buttonImage}>
          </Image>
        </TouchableOpacity>
      </ThemedView>

      <ThemedView style={styles.cardSection}>
        <ImageBackground
          source={require('../../assets/images/BG Card.png')}
          style={{ padding: 15 }}
          imageStyle={{ borderRadius: 25 }}>
          <ThemedView style={{ flexDirection: 'row', backgroundColor: 'rgba(0, 0, 0, 0)', paddingTop: 10 }}>
            <Image
              source={require('../../assets/images/ICON Achievements.png')}
              style={styles.cardIcon}
            />
            <ThemedText style={{ fontSize: 20, color: '#5f5f5f' }}>Lifetime Achievements</ThemedText>
          </ThemedView>
          <ThemedView style={{flexDirection: 'row', backgroundColor: 'rgba(0, 0, 0, 0)', paddingTop: 20}}>
              <ThemedView style={styles.cardVerticalLump}>
                <ThemedText style={{fontSize: 18, color: '#5f5f5f', paddingTop: 15}}>Challenges Cleared</ThemedText>
                <ChallengesClearedComponent />
                <ThemedText style={{fontSize: 18, color: '#5f5f5f', paddingTop: 20}}>Points Earned</ThemedText>
              </ThemedView>
              <ThemedView style={styles.cardVerticalLump}>
                <Image
                  source={require('../../assets/images/ICON Trophy.png')}
                  style={{width: 150, height: 100}}
                />
                <PointsEarnedComponent />
              </ThemedView>
            </ThemedView>
        </ImageBackground>
      </ThemedView>

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
    </ThemedView>
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

    color: '#000000',
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

  // Screen Background
  overallContainer: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: '#ffffff',
  },

  // Profile Information
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 30,
    paddingHorizontal: 30,
    paddingBottom: 10,
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  profileNameSection: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginHorizontal: 30,
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  profileNameText: {
    fontSize: 24,
    marginBottom: 5,
    color: '#000000',
  },
  profileDateText: {
    fontSize: 20,
    marginTop: 5,
    color: '#000000',
  },

  // Scoring
  scoreSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  scoreLumpLump: {
    flexDirection: 'column',
    alignItems: 'center',
    marginHorizontal: 15,
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  scoreLump: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    paddingBottom: 5,
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  scoreIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 10,
  },

  // BIG BUTTONS
  buttonsSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    marginTop: 50,
  },
  buttonButton: {
    width: 150,
    height: 150,
    borderRadius: 20,
    marginHorizontal: 10,
  },
  buttonImage: {
    width: 150,
    height: 150,
    borderRadius: 20,
  },

  // Achievements Card
  cardSection: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 40,
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  cardHorizontalTextSection: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  cardIcon: {
    width: 30,
    height: 30,
    marginRight: 5,
  },
  cardVerticalLump: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
});
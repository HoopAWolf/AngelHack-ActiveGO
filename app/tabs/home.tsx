import { Image, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  return (
    <ThemedView style={styles.overallContainer}>
      <ThemedView style={styles.profileSection}>
        <Image
          source={{ uri: 'https://via.placeholder.com/150' }}
          style={styles.profileImage}
        />
        <ThemedView style={styles.profileNameSection}>
          <ThemedText style={styles.profileNameText}>User Name Here</ThemedText>
          <ThemedText style={styles.profileDateText}>Today's Date</ThemedText>
        </ThemedView>
      </ThemedView>

      <ThemedView style={styles.scoreSection}>
        <ThemedView style={styles.scoreLumpLump}>
          <ThemedView style={styles.scoreLump}>
            <Image
              source={require('../../assets/images/ICON Heart.png')}
              style={styles.scoreIcon}
            />
            <ThemedText style={styles.scoreText}>0123</ThemedText>
          </ThemedView>
          <ThemedText style={styles.scoreText}>Healthpoints</ThemedText>
        </ThemedView>
        <ThemedView style={styles.scoreLumpLump}>
          <ThemedView style={styles.scoreLump}>
            <Image
              source={require('../../assets/images/ICON Gift.png')}
              style={styles.scoreIcon}
            />
            <ThemedText style={styles.scoreText}>0123</ThemedText>
          </ThemedView>
          <ThemedText style={styles.scoreText}>Rewards</ThemedText>
        </ThemedView>
      </ThemedView>

      <ThemedView style={styles.buttonsSection}>
        <TouchableOpacity style={styles.buttonButton}>
          <Image
            source={require('../../assets/images/BUTTON Friends.png')} 
            style={styles.buttonImage}>
          </Image>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonButton}>
          <Image
            source={require('../../assets/images/BUTTON Challenges.png')} 
            style={styles.buttonImage}>
          </Image>
        </TouchableOpacity>
      </ThemedView>

      <ThemedView style={styles.cardSection}>
        <ImageBackground
          source={ require('../../assets/images/BG Card.png')}
          style={{flex: 1, padding: 15}}
          imageStyle={{borderRadius: 25}}>
            <ThemedView style={{flexDirection: 'row', backgroundColor: 'rgba(0, 0, 0, 0)', paddingTop: 10}}>
              <Image
                source={require('../../assets/images/ICON Achievements.png')}
                style={styles.cardIcon}
              />
              <ThemedText style={{fontSize: 20, color: '#5f5f5f'}}>Lifetime Achievements</ThemedText>
            </ThemedView>
            <ThemedView style={{flexDirection: 'row', backgroundColor: 'rgba(0, 0, 0, 0)', paddingTop: 20}}>
              <ThemedView style={styles.cardVerticalLump}>
                <ThemedText style={{fontSize: 18, color: '#5f5f5f', paddingTop: 15}}>Challenges Cleared</ThemedText>
                <ThemedText style={{fontSize: 32, color: '#000000', paddingTop: 10}}>0123</ThemedText>
                <ThemedText style={{fontSize: 18, color: '#5f5f5f', paddingTop: 20}}>Points Earned</ThemedText>
              </ThemedView>
              <ThemedView style={styles.cardVerticalLump}>
                <Image
                  source={require('../../assets/images/ICON Trophy.png')}
                  style={{width: 150, height: 100}}
                />
                <ThemedText style={{fontSize: 24, color: '#000000', paddingRight: 5, alignSelf: 'flex-end'}}>0123</ThemedText>
              </ThemedView>
            </ThemedView>
        </ImageBackground>
      </ThemedView>

    </ThemedView>
  );
}

const styles = StyleSheet.create({
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
    padding: 10,
    paddingLeft: 30,
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  profileNameSection: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 30,
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
  scoreText: {
    fontSize: 20,
    color: '#000000',
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
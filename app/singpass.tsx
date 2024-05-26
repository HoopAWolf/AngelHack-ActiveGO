import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { Icon, Text } from 'react-native-paper';


const SingpassScreen = (props: any) => {
    const { navigation } = props;
    return (
        <View style={styles.container}>

            <View
                style={{
                    display: 'flex', justifyContent: 'space-between', flexDirection: 'row', backgroundColor: '#ff6079', height: 59, alignItems: 'center'
                }}>
                <Icon size={32} source={'chevron-left'} color='white'></Icon>
                <Text theme={{ colors: { onSurface: 'white' } }} style={{ fontWeight: 'bold' }} variant='headlineSmall'>Sign In</Text>
                <View style={{ opacity: 0 }}><Icon size={32} source={'chevron-right'} color='white'></Icon></View>
            </View>
            <TouchableOpacity style={{alignItems: 'center'}} onPress={() => { navigation.navigate('Home')}} >
                <Image
                    source={require('../assets/images/singpass-qr.png')} // Use the correct relative path
                />
            </TouchableOpacity>
        </View>
    );
};
export default SingpassScreen;

const styles = StyleSheet.create({
    container: {
    },
    backgroundImg: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    singInWith: {
        marginTop: 40,
    },
    singPassButton: {
        width: 266,
        height: 62,
    },
    healthy365Button: {
        width: 266,
        height: 62,
        justifyContent: 'center',
    },
    buttonContainer: {
        marginTop: 14,
        display: 'flex',
        alignItems: "center",
        gap: 12,
    }
});
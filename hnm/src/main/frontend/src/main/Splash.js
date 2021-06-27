import React from 'react'
import { StyleSheet, View, Text, Image, Dimensions } from 'react-native';

function Splash() {
    return (
        <View style={styles.container}>
            <Image style={styles.mainLogo} source={require('../../images/lantern/MainLantern.png')} />
            <Text style={styles.logoText}>HONG&MAN</Text>
        </View>
    )
}

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff'
  },
  mainLogo: {
    width: (width * 53.3) / 100,
    height: (height * 40.4) / 100,
  },
  logoText: {
    fontSize: 30,
    fontFamily: 'TmoneyRoundWindExtraBold',
    color: '#FFC845'
  },
});

export default Splash

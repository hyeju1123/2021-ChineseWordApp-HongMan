import React, { useLayoutEffect } from 'react'
import { StatusBar, StyleSheet, View, Text, Image, Dimensions } from 'react-native';

function Splash({navigation}) {

    navigation && 
    useLayoutEffect(() => {
      navigation.setOptions({
        headerShown: false
      })
      return () => {
        navigation.setOptions({
          headerShown: true
        })        
      }
    }, [])

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={'transparent'} translucent={true} />
            <Image style={styles.mainLogo} source={require('../../images/lantern/MainLantern.png')} />
            <Text style={styles.logoText}>LOADING</Text>
        </View>
    )
}

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
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

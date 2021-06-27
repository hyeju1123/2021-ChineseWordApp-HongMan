import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Image, Dimensions } from 'react-native';

const StartPage = ({ navigation }) => {

    return (

        <View style={styles.container}>
            <Image style={styles.mainLogo} source={require('../../images/lantern/MainLantern.png')} />
            <Text style={styles.logoText}>HONG&MAN</Text>
            <TouchableOpacity style={styles.loginButton} onPress={() => {navigation.navigate('SignIn')}}>
                <Text style={styles.loginText}>로그인</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.singUpButton} onPress={() => {navigation.navigate('SignUp')}}>
                <Text style={styles.signUpText}>회원가입</Text>
            </TouchableOpacity>
        </View>
  );
};


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
  loginButton: {
    width: (width * 80) / 100,
    height: (height * 7) / 100,
    borderColor: '#D14124',
    borderWidth: 2,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
    marginTop: 30
  },
  loginText: {
    fontSize: 20,
    fontFamily: 'TmoneyRoundWindRegular',
    color: '#D14124'
  },
  singUpButton: {
    width: (width * 80) / 100,
    height: (height * 7) / 100,
    borderColor: '#D14124',
    borderWidth: 2,
    backgroundColor: '#D14124',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
    marginTop: 20
  },
  signUpText: {
    fontSize: 20,
    fontFamily: 'TmoneyRoundWindRegular',
    color: '#ffffff'
  }
});

export default StartPage;

import React from 'react';
import { StyleSheet, 
         StatusBar,
         ScrollView, 
         TouchableOpacity, 
         Text, 
         Image, 
         Dimensions, 
         SafeAreaView,
         View } from 'react-native';

const StartPage = ({ navigation }) => {

    return (

        <SafeAreaView style={styles.container}>
          <StatusBar barStyle="dark-content" backgroundColor={'transparent'} translucent={true} />
          <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }} width='100%'>
            <View style={styles.logoContainer}>
              <Image style={styles.mainLogo} source={require('../../images/lantern/MainLantern.png')} />
              <Text style={styles.logoText}>HONG&MAN</Text>
            
              <TouchableOpacity style={styles.loginButton} onPress={() => {navigation.navigate('SignIn')}}>
                  <Text style={styles.loginText}>로그인</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.singUpButton} onPress={() => {navigation.navigate('SignUp')}}>
                  <Text style={styles.signUpText}>회원가입</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
  );
};


const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff'
  },
  logoContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: '5%', 
    marginBottom: '5%'
    // marginBottom: '10%'
  },
  mainLogo: {
    width: (width * 53.3) / 100,
    height: (height * 40.4) / 100,
  },
  logoText: {
    fontSize: width > 500 ? 50 : 30,
    fontFamily: 'TmoneyRoundWindExtraBold',
    color: '#FFC845'
  },
  loginButton: {
    width: (width * 80) / 100,
    height: (height * 7) / 100,
    borderColor: '#D14124',
    borderWidth: 2,
    borderRadius: width > 500 ? 40 : 25,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
    marginTop: 30
  },
  loginText: {
    fontSize: width > 500 ? 30 : 20,
    fontFamily: 'TmoneyRoundWindRegular',
    color: '#D14124'
  },
  singUpButton: {
    width: (width * 81) / 100,
    height: (height * 7) / 100,
    // borderColor: '#D14124',
    // borderWidth: 2,
    backgroundColor: '#D14124',
    borderRadius: width > 500 ? 43 : 28,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
    marginTop: 20
  },
  signUpText: {
    fontSize: width > 500 ? 30 : 20,
    fontFamily: 'TmoneyRoundWindRegular',
    color: '#ffffff'
  }
});

export default StartPage;

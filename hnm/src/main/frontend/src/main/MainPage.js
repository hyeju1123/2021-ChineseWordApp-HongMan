 import React from 'react';
 import { StyleSheet, View, TouchableOpacity, StatusBar, SafeAreaView, ScrollView, Image } from 'react-native';
 
 import MainPageCard from './MainPageCard';
 import Images from '../ImageIndex';
 
 const MainPage = ({ navigation }) => {
 
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={'transparent'} translucent={true} />
      <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}>
      <View style={styles.cardContainer}>
        {/* <Image source={Images.mainPage.newStudy} /> */}
          <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('StudyNavigation')}>
            <MainPageCard cardName={Images.mainPage.study} name="학습"  />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('VocaNavigation')}>
            <MainPageCard cardName={Images.mainPage.voca} name="단어장" />
          </TouchableOpacity>
          <MainPageCard cardName={Images.mainPage.test} name="시험" />
          <MainPageCard cardName={Images.mainPage.radical} name="부수" />
          <MainPageCard cardName={Images.mainPage.community} name="커뮤니티" />
          <MainPageCard cardName={Images.mainPage.dumpling} name="Project-HM" />
      </View>
      </ScrollView>
    </SafeAreaView>
  );
 };
 
const styles = StyleSheet.create({
   container: {
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#ffffff'
   },
   cardContainer: {
      width: '85%',
      height: '100%',
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      alignContent: 'center',
      // marginTop: width > 500 ? width * 0.03 : width * 0.1,
      backgroundColor: '#ffffff'
      // borderColor: 'black',
      // borderWidth: 5
   }
 });
 
 export default MainPage;
 
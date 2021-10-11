 import React from 'react';
 import { StyleSheet, View, TouchableOpacity, StatusBar, SafeAreaView, ScrollView, Dimensions } from 'react-native';
 
 import MainPageCard from './MainPageCard';
 import Images from '../ImageIndex';
 
 const MainPage = ({ navigation }) => {
 
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={'transparent'} translucent={true} />
      <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}>
      <View style={styles.cardContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('StudyNavigation')}>
            <MainPageCard cardName={Images.mainPage.study}  />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('VocaNavigation')}>
            <MainPageCard cardName={Images.mainPage.voca} />
          </TouchableOpacity>
          <MainPageCard cardName={Images.mainPage.test} />
          <MainPageCard cardName={Images.mainPage.radical} />
          <MainPageCard cardName={Images.mainPage.community} />
          <MainPageCard cardName={Images.mainPage.dumpling} />
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
 
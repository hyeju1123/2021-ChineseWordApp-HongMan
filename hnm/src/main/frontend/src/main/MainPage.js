 import React from 'react';
 import { StyleSheet, View, TouchableOpacity, Text, Alert, Image } from 'react-native';
 
 import MainPageCard from './MainPageCard';
 import Images from '../ImageIndex';
 
 const MainPage = ({ navigation }) => {
 
  return (
    <View style={styles.container}>
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
    </View>
  );
 };
 
 const styles = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: 'center',
      // justifyContent: 'center',
      backgroundColor: '#ffffff'
   },
   icon: {
      position: 'absolute',
      bottom: 60,
      width: 30,
      height: 10
   },
   cardContainer: {
      width: 306,
      height: 469,
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      alignContent: 'space-between',
      marginTop: 30
   }
 });
 
 export default MainPage;
 
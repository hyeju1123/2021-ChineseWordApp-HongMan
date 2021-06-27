 import React from 'react';
 import { StyleSheet, View, TouchableOpacity, Text, Alert, Image } from 'react-native';
 
 import MainPageCard from './MainPageCard';
 
 const MainPage = ({ navigation }) => {
 
  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('StudyNavigation')}>
            <MainPageCard cardName="학습"  />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('VocaNavigation')}>
            <MainPageCard cardName="단어장" />
          </TouchableOpacity>
          <MainPageCard cardName="시험" />
          <MainPageCard cardName="부수" />
          <MainPageCard cardName="커뮤니티" />
          <MainPageCard />
      </View>
    </View>
  );
 };
 
 const styles = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
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
      alignContent: 'space-between'
   }
 });
 
 export default MainPage;
 
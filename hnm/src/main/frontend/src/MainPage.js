 import React, { useState, useEffect } from 'react';
 import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
 import MainPageCard from './MainPageCard';

 import { LOCAL } from '../ipConfig';
 
 const MainPage = ({ navigation }) => {
 
  //  const [message, setMessage] = useState('');
 
  //  useEffect(() => {
  //    console.log(LOCAL)
  //    fetch(`http://${LOCAL}:8080/api/hello`)
  //      .then(res => res.text())
  //      .then(msg => {
  //        setMessage(msg);
  //        })
  //      .catch(e => {
  //        console.log(e)
  //      });
  //  }, [])
 
   return (
     <View style={styles.container}>
      <View style={styles.cardContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('StudyPartList')}>
            <MainPageCard cardName="학습"  />
          </TouchableOpacity>
          <MainPageCard cardName="단어장" />
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
 
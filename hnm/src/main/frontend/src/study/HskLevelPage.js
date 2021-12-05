import React from 'react';
import { View, StatusBar, SafeAreaView, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import HskLevelCard from './HskLevelCard';
import styles from '../main/styles/MainPageStyle';

const HskLevelPage = ({ navigation }) => {

  const color = useSelector(state => state.color.theme)
  
  let theme =  {
    r: '#D14124',
    w: '#ffffff'
  }

 return (
   <SafeAreaView style={styles.container} backgroundColor={theme[color]}>
     <StatusBar barStyle="dark-content" backgroundColor={'transparent'} translucent={true} />
     <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}>
     <View style={styles.cardContainer}>
        <HskLevelCard color={color} level='1' navigation={navigation} />
        <HskLevelCard color={color} level='2' navigation={navigation} />         
        <HskLevelCard color={color} level='3' navigation={navigation} />
        <HskLevelCard color={color} level='4' navigation={navigation} />
        <HskLevelCard color={color} level='5' navigation={navigation} />
        <HskLevelCard color={color} level='6' navigation={navigation} />
     </View>
     </ScrollView>
   </SafeAreaView>
 );
};

export default HskLevelPage;

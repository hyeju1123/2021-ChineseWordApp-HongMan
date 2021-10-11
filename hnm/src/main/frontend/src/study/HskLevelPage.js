import React from 'react';
import { StyleSheet, View, TouchableOpacity, StatusBar, SafeAreaView, ScrollView, Dimensions } from 'react-native';
import HskLevelCard from './HskLevelCard';

const HskLevelPage = ({ navigation }) => {

 return (
   <SafeAreaView style={styles.container}>
     <StatusBar barStyle="dark-content" backgroundColor={'transparent'} translucent={true} />
     <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}>
     <View style={styles.cardContainer}>
        <HskLevelCard level='1' navigation={navigation} />
        <HskLevelCard level='2' navigation={navigation} />         
        <HskLevelCard level='3' navigation={navigation} />
        <HskLevelCard level='4' navigation={navigation} />
        <HskLevelCard level='5' navigation={navigation} />
        <HskLevelCard level='6' navigation={navigation} />
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
     backgroundColor: '#D14124'
  },
  cardContainer: {
     width: '85%',
     height: '100%',
     display: 'flex',
     flexDirection: 'row',
     flexWrap: 'wrap',
     justifyContent: 'space-between',
     alignContent: 'center',     
    //  backgroundColor: '#ffffff'
  }
});

export default HskLevelPage;

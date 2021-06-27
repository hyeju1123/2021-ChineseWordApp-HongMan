import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const MainPageCard = (props) => {

  return (
    <>
     
        <View style={styles.container}>
            <Text style={styles.cardName}>{props.cardName}</Text>
        </View>
      
    </>
  );
};

const styles = StyleSheet.create({
    container: {
        width: 143,
        height: 143,
        backgroundColor: '#D14124',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardName: {
      fontSize: 30,
      fontFamily: 'TmoneyRoundWindRegular',
      color: '#ffffff',
    },
});

export default MainPageCard;

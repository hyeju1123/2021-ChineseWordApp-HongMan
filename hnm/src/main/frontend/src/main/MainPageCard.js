import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';



const MainPageCard = (props) => {

  const dumpling = 'dumpling.png';

  console.log(props.cardName)
  return (
    <>
     
        <View style={styles.container}>
            {/* <Text style={styles.cardName}>{props.cardName}</Text> */}
            <Image style={styles.icon} source={props.cardName} />
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
    icon: {
      width: 109,
      height: 109
    }
});

export default MainPageCard;

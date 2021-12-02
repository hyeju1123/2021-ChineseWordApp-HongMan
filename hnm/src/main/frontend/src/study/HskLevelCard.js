import React from 'react';
import { StyleSheet, View, Dimensions, Text, TouchableOpacity } from 'react-native';
import styles from '../main/style/MainPageCardStyle';


const HskLevelCard = (props) => {

    const { color, navigation, level } = props;
    let theme =  {
        r: {
            big: '#BEBEBE',
            small: '#FFFFFF',
            text: '#655858'
        },
        w: {
            big: '#AA351D',
            small: '#D14124',
            text: '#FFFFFF'
        },
    }

    return (
        <TouchableOpacity activeOpacity={0.9} onPress={() => {navigation.navigate('HskThemePage', { level: level })}}>
            <View style={[styles.container, {backgroundColor: theme[color].big}]}>
                <View style={[styles.smallContainer, {backgroundColor: theme[color].small}]}>
                    <Text style={[styles.hskText, {color: theme[color].text}]}>HSK</Text>
                    <Text style={[styles.hskText, {color: theme[color].text}]}>{level}급</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
  
};

const width = Dimensions.get('window').width;

// const styles = StyleSheet.create({
//     container: {
//       backgroundColor: '#BEBEBE',
//       borderTopLeftRadius: 10,
//       borderTopRightRadius: 10,
//       borderBottomLeftRadius: 10,
//       borderBottomRightRadius: 10,
//       marginBottom: width * 0.05,
//     },
//     smallContainer: {
//         backgroundColor: '#ffffff',
//         borderTopLeftRadius: 10,
//         borderTopRightRadius: 10,
//         borderBottomLeftRadius: 8,
//         borderBottomRightRadius: 8,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     cardText: {
//         color: '#655858',
//         fontFamily: 'TmoneyRoundWindExtraBold',
//         fontSize: width * 0.08 
//     }
// });

export default HskLevelCard;

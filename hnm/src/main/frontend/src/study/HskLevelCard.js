import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../main/styles/MainPageCardStyle';


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

export default HskLevelCard;

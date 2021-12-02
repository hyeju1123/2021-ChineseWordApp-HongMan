import React from 'react';
import { View, Image, Text } from 'react-native';
import styles from './style/MainPageCardStyle';

const MainPageCard = (props) => {
    return (
        <View style={styles.container}>
            <View style={styles.smallContainer}>
                <Image style={styles.image} source={props.cardName} />
                <Text style={styles.text}>{props.name}</Text>
            </View>
        </View>
    );
};

export default MainPageCard;

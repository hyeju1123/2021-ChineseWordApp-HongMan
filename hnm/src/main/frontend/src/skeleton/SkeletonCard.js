import React from 'react';
import { View, Dimensions, SafeAreaView } from 'react-native';
import { useSelector } from 'react-redux';
import styles from './styles/SkeletonCardStyle';

const SkeletonCard = () => {

    const color = useSelector(state => state.color.theme);
    let width = Dimensions.get('window').width;
    let theme =  {
        r: '#D14124',
        w: '#FFFFFF',
    }
    let cards = [0,1,2,3,4,5].map((id) => (
        <View key={id} style={[styles.card]}>
            <View style={[styles.cardText, { width: width * 0.3}]} />
            <View style={[styles.cardText, { width: width * 0.5}]} />
            <View style={[styles.cardText, { width: width * 0.45}]} />
        </View>
    ))

    return (
        <SafeAreaView style={[styles.container, {backgroundColor: theme[color], alignItems: 'center'}]}>
            <View style={styles.cardContainer}> 
                {cards}
            </View>
        </SafeAreaView>
    );
};


export default SkeletonCard;

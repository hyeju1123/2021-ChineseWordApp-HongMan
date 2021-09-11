import React from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';

const SkeletonCard = () => {

    return (
        <View style={styles.card}>
            
        </View>
    );
};

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;


const styles = StyleSheet.create({
    card: {
        width: (width * 84) / 100,
        height: (height * 19.3) / 100,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        backgroundColor: '#ffffff',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 30,
        marginBottom: 20
    },
    
});

export default SkeletonCard;

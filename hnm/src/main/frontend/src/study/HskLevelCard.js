import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions, Text, TouchableOpacity } from 'react-native';


const HskLevelCard = ({navigation, level}) => {

    // const { level } = route.params;
    const [availableDeviceWidth, setAvailableDeviceWidth] = useState(Dimensions.get('window').width)

    useEffect(() => {
        const updateLayout = () => {
        console.log('dp: ', Dimensions.get('window').width)
        setAvailableDeviceWidth(Dimensions.get('window').width);
        }
        Dimensions.addEventListener('change', updateLayout);

        return () => {
        Dimensions.removeEventListener('change', updateLayout)
        }
    }, [])

    
    if (availableDeviceWidth > 1200) {
        return (
            <TouchableOpacity onPress={() => {navigation.navigate('HskThemePage', { level: level })}}>
                <View 
                    style={styles.container} 
                    width={availableDeviceWidth * 0.25} 
                    height={availableDeviceWidth * 0.25}
                >
                    <Text style={styles.cardText}>HSK</Text>
                    <Text style={styles.cardText}>{level}급</Text>
                </View>
            </TouchableOpacity>
        );
    }

    if (availableDeviceWidth > 750) {
        return (
            <TouchableOpacity onPress={() => {navigation.navigate('HskThemePage', { level: level })}}>
                <View 
                    style={styles.container} 
                    width={availableDeviceWidth * 0.4} 
                    height={availableDeviceWidth * 0.4}
                >
                    <Text style={styles.cardText}>HSK</Text>
                    <Text style={styles.cardText}>{level}급</Text>
                </View>
            </TouchableOpacity>
        );
    }

    if (availableDeviceWidth > 500) {
        return (
            <TouchableOpacity onPress={() => {navigation.navigate('HskThemePage', { level: level })}}>
                <View 
                    style={styles.container} 
                    width={availableDeviceWidth * 0.25} 
                    height={availableDeviceWidth * 0.25}
                >
                    <Text style={styles.cardText}>HSK</Text>
                    <Text style={styles.cardText}>{level}급</Text>
                </View>
            </TouchableOpacity>
        );
    }

    return (
        <TouchableOpacity onPress={() => {navigation.navigate('HskThemePage', { level: level })}}>
            <View 
                style={styles.container} 
                width={availableDeviceWidth * 0.4} 
                height={availableDeviceWidth * 0.4}
            >
                <Text style={styles.cardText}>HSK</Text>
                <Text style={styles.cardText}>{level}급</Text>
            </View>
        </TouchableOpacity>
    );
  
};

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#FFFFFF',
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      borderBottomLeftRadius: 15,
      borderBottomRightRadius: 15,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: width * 0.05,
      elevation: 15,
      shadowColor: '#BEBEBE'
    //   borderBottomColor: '#BEBEBE',
    //   borderBottomWidth: 15,
    },
    cardText: {
        color: '#655858',
        fontFamily: 'TmoneyRoundWindExtraBold',
        fontSize: width * 0.08 
    }
});

export default HskLevelCard;

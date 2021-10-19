import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions, Text, TouchableOpacity } from 'react-native';


const HskLevelCard = ({navigation, level}) => {

    const [availableDeviceWidth, setAvailableDeviceWidth] = useState(Dimensions.get('window').width);
    const [availableDeviceHeight, setAvailableDeviceHeight] = useState(Dimensions.get('window').height);

    useEffect(() => {
        const updateLayout = () => {
            setAvailableDeviceWidth(Dimensions.get('window').width);
            setAvailableDeviceHeight(Dimensions.get('window').height);
        }
        Dimensions.addEventListener('change', updateLayout);

        return () => {
            Dimensions.removeEventListener('change', updateLayout)
        }
    }, [])

    
    if (availableDeviceWidth > 1200) {
        return (
            <TouchableOpacity activeOpacity={0.9} onPress={() => {navigation.navigate('HskThemePage', { level: level })}}>
                <View style={styles.container} width={availableDeviceWidth * 0.25} height={availableDeviceWidth * 0.25}>
                    <View style={styles.smallContainer} width={availableDeviceWidth * 0.25} height={availableDeviceWidth * 0.24}>
                        <Text style={styles.cardText}>HSK</Text>
                        <Text style={styles.cardText}>{level}급</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    // 태블릿
    if (availableDeviceWidth > 750 && availableDeviceHeight > availableDeviceWidth) {
        return (
            <TouchableOpacity activeOpacity={0.9} onPress={() => {navigation.navigate('HskThemePage', { level: level })}}>
                <View style={styles.container} width={availableDeviceWidth * 0.4} height={availableDeviceWidth * 0.4}>
                    <View style={styles.smallContainer} width={availableDeviceWidth * 0.4} height={availableDeviceWidth * 0.38}>
                        <Text style={styles.cardText}>HSK</Text>
                        <Text style={styles.cardText}>{level}급</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    // 폰
    if (availableDeviceWidth > 750 && availableDeviceHeight < availableDeviceWidth) {
        return (
            <TouchableOpacity activeOpacity={0.9} onPress={() => {navigation.navigate('HskThemePage', { level: level })}}>
                <View marginTop={availableDeviceWidth * 0.03} style={styles.container} width={availableDeviceWidth * 0.22} height={availableDeviceWidth * 0.22}>
                    <View style={styles.smallContainer} width={availableDeviceWidth * 0.22} height={availableDeviceWidth * 0.21}>
                        <Text style={styles.cardText}>HSK</Text>
                        <Text style={styles.cardText}>{level}급</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    if (availableDeviceWidth > 500) {
        return (
            <TouchableOpacity activeOpacity={0.9} onPress={() => {navigation.navigate('HskThemePage', { level: level })}}>
                <View style={styles.container} width={availableDeviceWidth * 0.25} height={availableDeviceWidth * 0.25}>
                    <View style={styles.smallContainer} width={availableDeviceWidth * 0.25} height={availableDeviceWidth * 0.22}>
                        <Text style={styles.cardText}>HSK</Text>
                        <Text style={styles.cardText}>{level}급</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    return (
        <TouchableOpacity activeOpacity={0.9} onPress={() => {navigation.navigate('HskThemePage', { level: level })}}>
            <View style={styles.container} width={availableDeviceWidth * 0.4} height={availableDeviceWidth * 0.4}>
                <View style={styles.smallContainer} width={availableDeviceWidth * 0.4} height={availableDeviceWidth * 0.38}>
                    <Text style={styles.cardText}>HSK</Text>
                    <Text style={styles.cardText}>{level}급</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
  
};

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#BEBEBE',
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
      marginBottom: width * 0.05,
    },
    smallContainer: {
        backgroundColor: '#ffffff',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardText: {
        color: '#655858',
        fontFamily: 'TmoneyRoundWindExtraBold',
        fontSize: width * 0.08 
    }
});

export default HskLevelCard;

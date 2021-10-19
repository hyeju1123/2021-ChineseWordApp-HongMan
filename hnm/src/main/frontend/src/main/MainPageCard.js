import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, Dimensions, Text } from 'react-native';


const MainPageCard = (props) => {

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
      <View style={styles.container} width={availableDeviceWidth * 0.25} height={availableDeviceWidth * 0.25}>
        <View style={styles.smallContainer} width={availableDeviceWidth * 0.25} height={availableDeviceWidth * 0.24}>
          <Image style={{ width: availableDeviceWidth * 0.17, height: availableDeviceWidth * 0.17 }} source={props.cardName} />
          <Text style={{ fontFamily: 'TmoneyRoundWindRegular', fontSize: availableDeviceWidth * 0.02, color: '#ffffff', marginBottom: '-7%' }}>{props.name}</Text>
        </View>
      </View>
    );
  }

  // 태블릿
  if (availableDeviceWidth > 750 && availableDeviceHeight > availableDeviceWidth) {
    return (
      <View style={styles.container} width={availableDeviceWidth * 0.4} height={availableDeviceWidth * 0.4}>
        <View style={styles.smallContainer} width={availableDeviceWidth * 0.4} height={availableDeviceWidth * 0.38}>
          <Image style={{ width: availableDeviceWidth * 0.28, height: availableDeviceWidth * 0.28 }} source={props.cardName} />
          <Text style={{ fontFamily: 'TmoneyRoundWindRegular', fontSize: availableDeviceWidth * 0.03, color: '#ffffff', marginBottom: '-7%' }}>{props.name}</Text>
        </View>
      </View>
    );
  }

  // 폰
  if (availableDeviceWidth > 750 && availableDeviceHeight < availableDeviceWidth) {
    return (
      <View style={styles.container} width={availableDeviceWidth * 0.22} height={availableDeviceWidth * 0.22}>
        <View style={styles.smallContainer} width={availableDeviceWidth * 0.22} height={availableDeviceWidth * 0.21}>
          <Image style={{ width: availableDeviceWidth * 0.14, height: availableDeviceWidth * 0.14 }} source={props.cardName} />
          <Text style={{ fontFamily: 'TmoneyRoundWindRegular', fontSize: availableDeviceWidth * 0.02, color: '#ffffff', marginBottom: '-7%' }}>{props.name}</Text>
        </View>
      </View>
    );
  }

  if (availableDeviceWidth > 500) {
    return (
      <View style={styles.container} width={availableDeviceWidth * 0.25} height={availableDeviceWidth * 0.25}>
        <View style={styles.smallContainer} width={availableDeviceWidth * 0.25} height={availableDeviceWidth * 0.22}>
          <Image style={{ width: availableDeviceWidth * 0.2, height: availableDeviceWidth * 0.2 }} source={props.cardName} />
          <Text style={{ fontFamily: 'TmoneyRoundWindRegular', fontSize: availableDeviceWidth * 0.03, color: '#ffffff', marginBottom: '-7%' }}>{props.name}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container} width={availableDeviceWidth * 0.4} height={availableDeviceWidth * 0.4}>
      <View style={styles.smallContainer} width={availableDeviceWidth * 0.4} height={availableDeviceWidth * 0.38}>
        <Image style={{ width: availableDeviceWidth * 0.26, height: availableDeviceWidth * 0.26 }} source={props.cardName} />
        <Text style={{ fontFamily: 'TmoneyRoundWindRegular', fontSize: availableDeviceWidth * 0.035, color: '#ffffff', marginBottom: '-7%' }}>{props.name}</Text>
      </View>
    </View>
  );
  
};

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#AA351D',
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
      marginBottom: width * 0.05,
      marginTop: width * 0.01
    },
    smallContainer: {
      backgroundColor: '#D14124',
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
});

export default MainPageCard;

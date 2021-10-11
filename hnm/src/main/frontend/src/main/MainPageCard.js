import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, Dimensions } from 'react-native';


const MainPageCard = (props) => {

  const [availableDeviceWidth, setAvailableDeviceWidth] = useState(Dimensions.get('window').width)

  useEffect(() => {
    const updateLayout = () => {
      setAvailableDeviceWidth(Dimensions.get('window').width);
    }
    Dimensions.addEventListener('change', updateLayout);

    return () => {
      Dimensions.removeEventListener('change', updateLayout)
    }
  }, [])

  
  if (availableDeviceWidth > 1200) {
    return (
      <View style={styles.container} width={availableDeviceWidth * 0.25} height={availableDeviceWidth * 0.25}>
          <Image style={{ width: availableDeviceWidth * 0.2, height: availableDeviceWidth * 0.2 }} source={props.cardName} />
      </View>
    );
  }

  if (availableDeviceWidth > 750) {
    return (
      <View style={styles.container} width={availableDeviceWidth * 0.4} height={availableDeviceWidth * 0.4}>
          <Image style={{ width: availableDeviceWidth * 0.32, height: availableDeviceWidth * 0.32 }} source={props.cardName} />
      </View>
    );
  }

  if (availableDeviceWidth > 500) {
    return (
      <View style={styles.container} width={availableDeviceWidth * 0.25} height={availableDeviceWidth * 0.25}>
          <Image style={{ width: availableDeviceWidth * 0.2, height: availableDeviceWidth * 0.2 }} source={props.cardName} />
      </View>
    );
  }

  return (
    <View style={styles.container} width={availableDeviceWidth * 0.4} height={availableDeviceWidth * 0.4}>
        <Image style={{ width: availableDeviceWidth * 0.32, height: availableDeviceWidth * 0.32 }} source={props.cardName} />
    </View>
  );
  
};

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#D14124',
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      borderBottomLeftRadius: 15,
      borderBottomRightRadius: 15,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: width * 0.05,
      borderBottomColor: '#AA351D',
      borderBottomWidth: 15,
    },
});

export default MainPageCard;

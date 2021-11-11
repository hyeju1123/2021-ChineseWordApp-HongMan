import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, Platform } from "react-native";
import CustomAlert from '../block/CustomAlert';


const TestAlertPage = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View style={styles.centeredView}>
        <CustomAlert 
            visible={true} 
            title={'입력 성공!'}
            message={'마저 입력해주세요'} 
            buttons={[
                // {text: 'no'},
                {text: 'OK',
                func: () => {console.log('Yes Pressed')},}
            ]}
        />
        <View>
            <Pressable
            style={[styles.button, styles.buttonOpen]}
            onPress={() => setModalVisible(true)}
            >
            <Text style={styles.textStyle}>Show Modal</Text>
            </Pressable>
        </View>
        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
  
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    textStyle: {
      color: "white",
      fontWeight: "800",
      textAlign: "center"
    },
  
    iOSBackdrop: {
      backgroundColor: "#000000",
      opacity: 0.3
    },
    androidBackdrop: {
      backgroundColor: "#232f34",
      opacity: 0.4
    },
    backdrop: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0
    },
    alertBox: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    androidAlertBox: {
      maxWidth: 280,
      width: '100%',
      margin: 48,
      elevation: 24,
      borderRadius: 2,
    },
    androidTitle: {
      margin: 24,
    },
    androidMessage: {
      marginLeft: 24,
      marginRight: 24,
      marginBottom: 24,
    },
    androidButtonGroup: {
      marginTop: 0,
      marginRight: 0,
      marginBottom: 8,
      marginLeft: 24,
    },
    androidButton: {
      marginTop: 12,
      marginRight: 8,    
    },
    androidButtonInner: {
      padding: 10,
  
    }
  });

export default TestAlertPage;

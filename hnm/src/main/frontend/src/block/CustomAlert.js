import React, { useState } from 'react'
import { Modal, StyleSheet, Text, Pressable, View, Platform, Dimensions, Image } from "react-native";
import Dumpling from '../../images/mainPage/newDumpling.png';

function CustomAlert(props) {

    // const [modalVisible, setModalVisible] = useState(props.visible);

    const AndroidButtonBox = () => {
        const buttonProps = props.buttons && props.buttons.length > 0 ? props.buttons : [{}]
    
        return (
          <View style={styles.androidButtonGroup}>
            {
              buttonProps.map((item, index) => {
                  if(index > 2) return null;
                  return (
                    <View key={index}>
                      <Pressable onPress={() => {
                        // setModalVisible(false)
                        props.offFunc()
                        if(item.func && typeof(item.func) === 'function')
                          item.func();
                      }}>
                        <View style={styles.androidButtonInner}>
                          <Text style={styles.androidButtonText}
                          >{item.text}</Text>
                        </View>
                      </Pressable>
                    </View>
                  )
                })
    
            }
          </View>
        );
    }

    return (
        <Modal
            animationType="fade"
            transparent={true}
            // visible={modalVisible}
            onRequestClose={() => {
                // setModalVisible(false);
                props.offFunc();
            }}
        >
            {/* <Pressable style={[Platform.OS === "ios" ? styles.iOSBackdrop : styles.androidBackdrop, styles.backdrop]} onPress={() => setModalVisible(false)} /> */}
            <Pressable style={[Platform.OS === "ios" ? styles.iOSBackdrop : styles.androidBackdrop, styles.backdrop]} onPress={() => props.offFunc()} />
            <View style={styles.alertBox}>
            {
                Platform.OS === "ios" ? 
                null
                :
                <View style={styles.androidAlertBox}>
                    <View style={styles.dumplingWrapper}>
                        <Image source={Dumpling} style={styles.dumpling} />
                    </View>
                    <Text style={styles.androidTitle}>{props.title || 'Message'}</Text>
                    <Text style={styles.androidMessage}>{props.message || ''}</Text>
                    <AndroidButtonBox />
                </View>
            }
            </View>
        </Modal>
    )
}

const width = Dimensions.get('window').width;
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
      fontWeight: "bold",
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
    //   width: '100%',
      width: width * 0.7,
      minHeight: width * 0.65,
      margin: 48,
      elevation: 24,
      borderRadius: 2,
      backgroundColor: '#ffffff',
      borderTopRightRadius: 20,
      borderTopLeftRadius: 20,
      borderBottomRightRadius: 20,
      borderBottomLeftRadius: 20,
    },
    dumplingWrapper: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#D14124',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
    },
    dumpling: {
        width: width * 0.25,
        height: width * 0.25,
        marginTop: width * 0.02,
        marginBottom: width * 0.02
    },
    androidTitle: {
        fontFamily: 'TmoneyRoundWindExtraBold',
        color: '#655858',
        fontSize: width * 0.05,
        margin: 18,
        textAlign: 'center'
    },
    androidMessage: {
        fontFamily: 'TmoneyRoundWindRegular',
        color: '#BEBEBE',
        textAlign: 'center',
        lineHeight: width * 0.05
    },
    androidButtonGroup: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingRight: 10,
        paddingTop: 10
    },
    androidButtonInner: {
        padding: 10,
    },
    androidButtonText: {
        fontFamily: 'TmoneyRoundWindRegular',
        color: '#D14124',
    }
});

export default CustomAlert

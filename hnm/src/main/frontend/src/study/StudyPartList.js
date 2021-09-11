import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';

const StudyPartList = ({ navigation }) => {

  return (

    <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate('StudyDayList', { partNum: 1 })}>
            <View style={styles.partCard}>
                <Text style={styles.partNum}>1부</Text>
                <Text style={styles.partName}>인간</Text>
            </View>
        </TouchableOpacity>
            <View style={styles.partCard}>
                <Text style={styles.partNum}>2부</Text>
                <Text style={styles.partName}>자연</Text>
            </View>
        <View style={styles.partCard}>
                <Text style={styles.partNum}>3부</Text>
                <Text style={styles.partName}>생활</Text>
            </View>
        
    </View>
  );
};

const width_proportion = (Dimensions.get('window').width * 84) / 100;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        minHeight: height,
        alignItems: 'center',
        backgroundColor: '#D14124',
        paddingTop: 30,
        paddingBottom: 30,
    },
  
    partCard: {
        width: width_proportion,
        height: 156,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        backgroundColor: '#ffffff',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 48,
        paddingRight: 48,
        marginBottom: 30
    },
    partNum: {
        fontSize: 50,
        fontFamily: 'TmoneyRoundWindExtraBold',
        color: '#3E3A30'
    },
    partName: {
        fontSize: 40,
        fontFamily: 'TmoneyRoundWindRegular',
        color: '#75787B',
        top: 10
    }
});

export default StudyPartList;

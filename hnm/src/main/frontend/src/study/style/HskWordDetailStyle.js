
import { StyleSheet, Dimensions } from 'react-native';

const width = Dimensions.get('window').width;

const handleSize = () => {
    let commonPart = {
        container: {
            width: '100%',
            height: '100%',
            display: 'flex',
        },
        cardContainer: {
            width: '85%',
            marginTop: width * 0.03,
            marginBottom: width * 0.3
        },
        editIcon: {
            width: width > 500 ? width * 0.04 : width * 0.08,
            height: width > 500 ? width * 0.04 : width * 0.08,
            marginTop: width * 0.028,
            marginBottom: width * 0.028,
            marginRight: width * 0.03
        },
        wordCard: {
            display: 'flex',
            width: '100%',
            minHeight: width * 0.4,
            backgroundColor: '#ffffff',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
            elevation: 10,
            marginBottom: width * 0.04
        },
        wordText: {
            color: '#3E3A39',
            fontFamily: 'PingFangFCLight',
            fontSize: width * 0.18
        },
        intonationText: {
            fontFamily: 'KoPubWorld Dotum Bold',
            fontSize: width * 0.06,
        },
        wordClassCard: {
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            backgroundColor: '#ffffff',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            elevation: 10,
            // marginBottom: width * 0.07,
            marginBottom: width * 0.04,
            paddingRight: width * 0.035,
            paddingTop: width * 0.015,
            paddingBottom: width * 0.015
        },
        wordClassIcon: {
            width: width * 0.17,
            height: width * 0.1,
            marginTop: width * 0.02,
            marginBottom: width * 0.02,
            marginLeft: width * 0.035,
        },
        longWordClassIcon: {
            width: width * 0.24,
            height: width * 0.1,
            marginTop: width * 0.02,
            marginBottom: width * 0.02,
            marginLeft: width * 0.03,
        },
        meaningCard: {
            width: '100%',
            minHeight: width * 0.15,
            display: 'flex',
            flexDirection: 'row',
            backgroundColor: '#ffffff',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            elevation: 10,
            marginBottom: width * 0.07,
            paddingRight: width * 0.035,
            paddingTop: width * 0.015,
            paddingBottom: width * 0.015
        },
        meaningText: {
            color: '#3E3A39',
            fontFamily: 'TmoneyRoundWindRegular',
            fontSize: width * 0.055,
            lineHeight: width * 0.1,
            marginLeft: width * 0.035,
            marginTop: width * 0.02
        },
        meaningCard: {
            width: '100%',
            minHeight: width * 0.15,
            display: 'flex',
            flexDirection: 'row',
            backgroundColor: '#ffffff',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            elevation: 10,
            // marginBottom: width * 0.07,
            marginBottom: width * 0.04,
            paddingRight: width * 0.035,
            paddingTop: width * 0.015,
            paddingBottom: width * 0.015
        },
        meaningText: {
            color: '#3E3A39',
            fontFamily: 'TmoneyRoundWindRegular',
            fontSize: width * 0.055,
            lineHeight: width * 0.1,
            marginLeft: width * 0.035,
            marginTop: width * 0.02
        },
        explanationText: {
            color: '#8E8E8E',
            fontFamily: 'TmoneyRoundWindRegular',
            fontSize: width * 0.055,
            lineHeight: width * 0.1,
            marginLeft: width * 0.035,
            marginTop: width * 0.02
        },
        wordNavigation: {
            width: '85%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'absolute',
            bottom: width * 0.1
        },
        lanternIcon: {
            width: width * 0.13,
            height: width * 0.14,
        },
        previousIcon: {
            width: width * 0.09,
            height: width * 0.09,
            transform: [{ scaleX: -1 }]
        },
        nextIcon: {
            width: width * 0.09,
            height: width * 0.09,
        },
    }
    if (width > 500) {
        return StyleSheet.create({
            ...commonPart,
            wordCard: {
                display: 'flex',
                width: '100%',
                minHeight: width * 0.35,
                backgroundColor: '#ffffff',
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
                elevation: 10,
                marginBottom: width * 0.04
            },
            wordText: {
                color: '#3E3A39',
                fontFamily: 'PingFangFCLight',
                fontSize: width * 0.17
            },
            intonationText: {
                fontFamily: 'KoPubWorld Dotum Bold',
                fontSize: width * 0.05,
            },
        });
    } else {
        return StyleSheet.create({
            ...commonPart
        });
    }
}

const styles = handleSize();
export default styles;

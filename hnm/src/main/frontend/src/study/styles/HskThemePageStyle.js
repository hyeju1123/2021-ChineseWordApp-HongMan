
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
            marginTop: width * 0.02
        },
        bottomCard: {
            width: '100%',
            minHeight: width * 0.2,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
            marginBottom: width * 0.05,
            elevation: 8
        },
        topCard: {
            width: '100%',
            minHeight: width * 0.185,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
        },
        text: {
            fontFamily: 'TmoneyRoundWindExtraBold',
            fontSize: 32,
        },

        /* HskWordPage */
        hanziCard: {
            width: '100%',
            minHeight: width * 0.2,
            backgroundColor: '#FFFFFF',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: width * 0.04,
            elevation: 7
        },
        hanziText: {
            fontFamily: 'PingFangSCLight',
            fontSize: width * 0.1,
            color: '#3E3A39',
            marginBottom: width * 0.02,
            marginTop: width * 0.02,
        },
        intonationText: {
            fontFamily: 'KoPubWorld Dotum Medium',
            fontSize: width * 0.07,
            color: '#8E8E8E',
            marginBottom: width * 0.02
        }
    }
    if (width > 500) {
        return StyleSheet.create({
            ...commonPart,
            bottomCard: {
                ...commonPart.bottomCard,
                marginBottom: width * 0.03
            },
            text: {
                ...commonPart.text,
                fontSize: 48,
            },
            hanziCard: {
                ...commonPart.hanziCard,
                borderTopLeftRadius: 15,
                borderTopRightRadius: 15,
                borderBottomLeftRadius: 15,
                borderBottomRightRadius: 15,
                marginBottom: width * 0.02,
                elevation: 4
            },
            hanziText: {
                ...commonPart.hanziText,
                fontSize: width * 0.07,
                marginBottom: width * 0.01,
                marginTop: width * 0.03,
            },
            intonationText: {
                ...commonPart.intonationText,
                fontSize: width * 0.04,
                marginBottom: width * 0.03
            }               
        });
    } else {
        return StyleSheet.create({
            ...commonPart
        });
    }
}

const styles = handleSize();
export default styles;

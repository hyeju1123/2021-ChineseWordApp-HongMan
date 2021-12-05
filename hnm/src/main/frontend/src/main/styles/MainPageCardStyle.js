
import { StyleSheet, Dimensions } from 'react-native';

const width = Dimensions.get('window').width;

const handleSize = () => {
    let commonPart = {
        container: {
            width: width * 0.4,
            height: width * 0.4,
            backgroundColor: '#AA351D',
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
            marginBottom: width * 0.05,
            marginTop: width * 0.01
        },
        smallContainer: {
            width: width * 0.4,
            height: width * 0.38,
            backgroundColor: '#D14124',
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
        },
        image: {
            width: width * 0.28,
            height: width * 0.28
        },
        text: {
            fontFamily: 'TmoneyRoundWindRegular',
            fontSize: 16,
            color: '#ffffff',
            marginBottom: '-6%'
        },
        hskText: {
            fontFamily: 'TmoneyRoundWindExtraBold',
            fontSize: 32,
        }
    }
    if (width > 500) {
        return StyleSheet.create({
            ...commonPart,
            text: {
                ...commonPart.text,
                fontSize: 32,
                marginBottom: '-7%'
            },
            hskText: {
                ...commonPart.hskText,
                fontSize: 65,
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


import { StyleSheet, Dimensions } from 'react-native';

const width = Dimensions.get('window').width;

const handleSize = () => {
    let commonPart = {
        container: {
            width: '100%',
            height: '100%',
            position: 'absolute',
            zIndex: 7,
            backgroundColor: 'rgba(0, 0, 0, 0.8)'
        },
        closeContainer: {
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center'
        },
        title: {
            fontFamily: 'TmoneyRoundWindRegular',
            fontSize: width * 0.04,
            position: 'absolute',
            top: width * 0.045,
            left: width * 0.035
        },
        completeButton: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            top: width * 0.038,
            right: width * 0.025,
            width: width * 0.15,
            height: width * 0.075,
            borderWidth: 2,
            backgroundColor: 'transparent'
        },
        completeText: {
            fontFamily: 'KoPubWorld Dotum Medium',
            fontSize: width * 0.03,
        },
        inputWrapper: {
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            width: width * 0.82,
            minHeight: width * 0.3,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            borderBottomRightRadius: 10,
            borderBottomLeftRadius: 10,
            marginTop: width * 0.25
        },
        textInput: {
            width: width * 0.8,
            minHeight: width * 0.12,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            borderBottomRightRadius: 10,
            borderBottomLeftRadius: 10,
            marginTop: width * 0.15,
            marginBottom: width * 0.02,
            paddingLeft: width * 0.03,
            paddingRight: width * 0.03,
            paddingTop: width * 0.03,
            paddingBottom: width * 0.03,
            fontFamily: 'KoPubWorld Dotum Medium',
            fontSize: width * 0.05,
            textDecorationLine: 'none'
        }
    }
    if (width > 500) {
        return StyleSheet.create({
            ...commonPart,
        });
    } else {
        return StyleSheet.create({
            ...commonPart
        });
    }
}

const styles = handleSize();
export default styles;

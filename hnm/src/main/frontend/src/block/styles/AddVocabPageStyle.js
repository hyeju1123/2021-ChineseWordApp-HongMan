
import { StyleSheet, Dimensions } from 'react-native';

const width = Dimensions.get('window').width;

const handleSize = () => {
    let commonPart = {
        completeButton: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: width * 0.08,
            height: width * 0.08,
            borderRadius: width * 0.04,
            borderWidth: 2,
            marginRight: width * 0.04
        },
        completeText: {
            fontFamily: 'KoPubWorld Dotum Bold',
            fontSize: width * 0.045,
        },
        container: {
            width: '100%',
            height: '100%',
            display: 'flex',
        },
        inputContainer: {
            width: '85%',
            marginTop: width * 0.03,
        },
        hskWordCard: {
            display: 'flex',
            justifyContent:'center',
            width: '100%',
            height: width * 0.2,  
            backgroundColor: '#ffffff',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            marginBottom: width * 0.05,
            paddingLeft: width * 0.03,
            paddingRight: width * 0.03,
            elevation: 7
        },
        hskWordText: {
            fontFamily: 'TmoneyRoundWindRegular',
            fontSize: width * 0.05,
            paddingTop: width * 0.02,
            color: '#8E8E8E',
        },
        inputWrapper: {
            display: 'flex',
            flexDirection: 'row'
        },
        textInputWrapper: {
            flex: 1,
            height: width * 0.2,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#fff',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            elevation: 7,
            marginBottom: width * 0.05,
        },
        textInputCard: {
            flex: 1,
            height: width * 0.2,
            paddingLeft: width * 0.03,
            paddingRight: width * 0.05,
            paddingTop: width * 0.02,
            paddingBottom: 0,
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,
            color: '#000000',
            fontFamily: 'TmoneyRoundWindRegular',
            fontSize: width * 0.05,
            textDecorationLine: 'none',
        },
        pencilWrapper: {
            width: width * 0.1,
            height: width * 0.1,
        },
        pencilIcon: {
            width: width * 0.08,
            height: width * 0.08            
        },
        wordClassContainer: {
            width: '100%',
            minHeight: width * 0.2,
            backgroundColor: '#ffffff',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            marginBottom: width * 0.05,
            paddingTop: width * 0.01,
            elevation: 7
        },
        wordClassWrapper: {
            width: '85%',
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
        },
        wordClassTextWrapper: {
            width: '100%',
            height: width * 0.2,
            display: 'flex',
            justifyContent: 'center'
        },
        wordClassText: {
            fontFamily: 'TmoneyRoundWindRegular',
            fontSize: width * 0.05,
            marginLeft: width * 0.03,
            color: '#8E8E8E',
        },
        wordClassCheckContainer: {
            width: '100%',
            height: width * 0.8,
            display: 'flex',
            flexDirection: 'row',
            backgroundColor: 'rgba(221, 221, 221, 0.8)',
            flexWrap: 'wrap',
            position: 'absolute',
            bottom: 0
        },
        closeButtonWrapper: {
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-end',
        },
        closeButton: {
            width: width * 0.08,
            height: width * 0.08,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: (width * 0.08) / 2,
            backgroundColor: 'white',
            borderColor: '#D14124',
            borderWidth: 2,
            marginRight: width * 0.03,
            marginTop: width * 0.035
        },
        closeButtonText: {
            fontFamily: 'TmoneyRoundWindRegular',
            marginTop: '20%',
            fontSize: width * 0.08,
            color: '#D14124'
        },
        deletedWordClassIcon: {
            width: width * 0.173,
            height: width * 0.11,
            marginTop: width * 0.035,
            marginBottom: width * 0.035,
            marginLeft: width * 0.035,
        },
        deletedLongWordClassIcon: {
            width: width * 0.24,
            height: width * 0.11,
            marginTop: width * 0.035,
            marginBottom: width * 0.035,
            marginLeft: width * 0.03,
        },
        wordClassIcon: {
            width: width * 0.17,
            height: width * 0.1,
            marginTop: width * 0.035,
            marginBottom: width * 0.035,
            marginLeft: width * 0.035,
        },
        longWordClassIcon: {
            width: width * 0.24,
            height: width * 0.1,
            marginTop: width * 0.035,
            marginBottom: width * 0.035,
            marginLeft: width * 0.03,
        },
        meaningInputCard: {
            width: '100%',
            minHeight: width * 0.3,
            backgroundColor: '#ffffff',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            borderBottomRightRadius: 10,
            borderBottomLeftRadius: 10,
            marginBottom: width * 0.05,
            paddingLeft: width * 0.03,
            paddingRight: width * 0.05,
            paddingBottom: 0,
            fontFamily: 'TmoneyRoundWindRegular',
            fontSize: width * 0.05,
            textAlignVertical: 'top',
            elevation: 7
        },
    }
    if (width > 500) {
        return StyleSheet.create({
            ...commonPart,
            completeButton: {
                ...commonPart.completeButton,
                width: width * 0.05,
                height: width * 0.05,
                borderRadius: width * 0.025,
            },
            completeText: {
                ...commonPart.completeText,
                fontSize: width * 0.03,
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

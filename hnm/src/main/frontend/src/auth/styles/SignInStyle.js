
import { StyleSheet, Dimensions } from 'react-native';

const width = Dimensions.get('window').width;
const handleSize = () => {
    let commonPart = {
        container: {
            flex: 1,
            backgroundColor: '#ffffff'
        },
        topBlock: {
            width: '100%',
            height: width * 0.3,
            backgroundColor: '#D14124',
            alignItems: 'center',
            justifyContent: 'flex-end'
        },
        loginText: {
            fontFamily: 'TmoneyRoundWindRegular',
            color: 'white',
            fontSize: width * 0.15
        },
        inputContainer: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '5%',
            marginBottom: '5%'
        },
        input: {
            width: width * 0.85,
            height: width * 0.15,
            borderColor: '#D14124',
            borderWidth: 2,
            borderRadius: 25,
            paddingLeft: 20,
            marginTop: width * 0.05,
            fontSize: width * 0.045,
            fontFamily: 'KoPubWorld Dotum Medium',
            color: '#D14124'
        },
        bar: {
            width: width * 0.1,
            height: width * 0.02,
            backgroundColor: '#D14124',
            borderRadius: 50,
            marginTop: width * 0.1,
            marginBottom: width * 0.1
        },
        button: {
            width: width * 0.85,
            height: width * 0.15,
            backgroundColor: '#D14124',
            borderRadius: 28,
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: width * 0.03,
            marginTop: width * 0.1
        },
        buttonText: {
            fontSize: width * 0.055,
            fontFamily: 'TmoneyRoundWindRegular',
            color: '#ffffff'
        },
        googleLogo: {
            width: width * 0.245,
            height: width * 0.0859,
            marginRight: '3%',
            marginBottom: '3.5%'
        },
        naverLogo: {
            width: width * 0.25,
            height: width * 0.0474,
            marginRight: '3%',
            marginBottom: '3.5%'
        },
        signInButton: {
            display: 'flex',
            flexDirection: 'row',
            width: width * 0.85,
            height: width * 0.15,
            borderColor: '#D14124',
            borderWidth: 2,
            borderRadius: width > 500 ? 40 : 25,
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: 10,
            marginBottom: width * 0.05
        },
        signInText: {
            fontSize: width * 0.055,
            fontFamily: 'TmoneyRoundWindRegular',
            color: '#D14124'
        },
        signUpContainer: {
            display: 'flex',
            flexDirection: 'row',
            marginTop: '7%'
        },
        signUpQuestion: {
            fontSize: width * 0.05,
            color: '#3E3A30',
            fontFamily: 'TmoneyRoundWindRegular',
            marginRight: width * 0.02,
            marginLeft: width * 0.02
        },
        signUpText: {
            fontSize: width * 0.05,
            fontWeight: 'bold',
            color: '#D14124',
            fontFamily: 'TmoneyRoundWindRegular',
            textDecorationLine: 'underline',
            marginRight: width * 0.02,
        }
    }
    if (width > 500) {
        return StyleSheet.create({
            ...commonPart,
            loginText: {
                ...commonPart.loginText,
                fontSize: width * 0.1
            },
            input: {
                ...commonPart.input,
                height: width * 0.125,
                borderRadius: 45,
                paddingLeft: width * 0.05,
                fontSize: width * 0.035,
                marginTop: width * 0.03,
            },
            button: {
                ...commonPart.button,
                height: width * 0.125,
                borderRadius: 45,
            },
            buttonText: {
                ...commonPart.buttonText,
                fontSize: width * 0.04,
                paddingBottom: width * 0.01
            },
            signInButton: {
                ...commonPart.signInButton,
                height: width * 0.125,
                borderRadius: 45,
                paddingTop: width * 0.025,
                marginBottom: width * 0.03
            },
            googleLogo: {
                width: width * 0.215,
                height: width * 0.0753,
                marginRight: '5%',
                marginBottom: '2%'
            },
            naverLogo: {
                width: width * 0.2,
                height: width * 0.038,
                marginRight: '5%',
                marginBottom: '3%'
            },
            signInText: {
                ...commonPart.signInText,
                fontSize: width * 0.04,
            },
            signUpQuestion: {
                ...commonPart.signUpQuestion,
                fontSize: width * 0.035,
            },
            signUpText: {
                ...commonPart.signUpText,
                fontSize: width * 0.035,
            }
        });
    } else {
        return StyleSheet.create({
            ...commonPart,
        });
    }
}

const styles = handleSize();
export default styles;

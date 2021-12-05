
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
        contentsContainer: {        
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: '5%',
            marginRight: '5%',
            marginTop: '15%',
            marginBottom: '8%'
        },
        emailLogo: {
            width: width * 0.4,
            height: width * 0.35,
            marginRight: '0%',
            marginBottom: '3.5%'
        },
        completeMent: {
            fontFamily: 'TmoneyRoundWindRegular',
            fontSize: width * 0.08,
            marginBottom: '8%'
        },
        emailMent: {
            fontSize: width * 0.045,
            fontWeight: 'bold',
            marginBottom: '3%',
            marginLeft: '1%',
            marginRight: '1%',
        }, 
        announcement: {
            fontFamily: 'TmoneyRoundWindRegular',
            fontSize: width * 0.039,
            marginTop: '1%',
            marginLeft: '1%',
            marginRight: '1%',
            color: '#75787B'
        },
        bar: {
            width: '100%',
            height: 1,
            backgroundColor: '#D14124',
            marginTop: '10%',
            marginBottom: '10%'
        },
        resendContainer: {
            display: 'flex',
            flexDirection: 'row'
        },
        resendMent: {
            fontFamily: 'TmoneyRoundWindRegular',
            fontSize: width * 0.039,
            textDecorationLine: 'underline',
            marginTop: '1%',
            marginLeft: '2%'
        },
        confirmButton: {
            width: width * 0.5,
            height: width * 0.13,
            borderColor: '#D14124',
            borderWidth: 2,
            borderRadius: width * 0.4,
            alignItems: 'center',
            paddingTop: width * 0.02,
            marginTop: width * 0.05
        },
        confirmMent: {
            fontSize: width * 0.06,
            fontFamily: 'TmoneyRoundWindRegular',
            color: '#D14124',
        },
        sendingContainer: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center'
        }
    }
    if (width > 500) {
        return StyleSheet.create({
            ...commonPart,
        
        });
    } else {
        return StyleSheet.create({
            ...commonPart,
        });
    }
}

const styles = handleSize();
export default styles;


import { StyleSheet, Dimensions } from 'react-native';

const width = Dimensions.get('window').width;
const handleSize = () => {
    let commonPart = {
        editMenuIcon: {
            width: width * 0.08,
            height: width * 0.08,
            marginTop: width * 0.028,
            marginBottom: width * 0.028,
            marginRight: width * 0.03
        },
        container: {
            width: '100%',
            height: '100%',
            display: 'flex',
        },
        editMenuContainer: {
            position: 'absolute',
            zIndex: 7,
            width: '100%',
            elevation: 5
        },
        editMenuText: {
            fontFamily: 'TmoneyRoundWindRegular',
            textAlign: 'center',
            fontSize: width * 0.05,
            paddingTop: width * 0.023,
        },
        editMenuBar: {
            width: '80%',
            height: 1,
        },
        cardContainer: {
            width: '85%',
            marginTop: width * 0.02,
        },
        card: {
            minHeight: width * 0.32,
            backgroundColor: '#FFFFFF',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            alignItems: 'center',
            marginBottom: width * 0.05,
            elevation: 8
        },
        cardText: {
            fontFamily: 'PingFangFCLight',
            fontSize: width * 0.12,
            color: '#3E3A39',
            marginBottom: width * 0.03,
            marginTop: width * 0.018,
            marginLeft: width * 0.05,
            marginRight: width * 0.05
        },
        searchIconWrapper: {
            width: width * 0.1,
            height: width * 0.1,
            position: 'absolute',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            top: width * 0.025,
            right: width * 0.04,
            marginLeft: width * 0.03
        },
        searchIcon: {
            width: width * 0.055,
            height: width * 0.055,
        },
        touchBox: {
            width: '90%',
            backgroundColor: '#D14124',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            paddingTop: width * 0.005,
            paddingBottom: width * 0.005,
            marginBottom: width * 0.03
        },
        touchBoxText: {
            fontFamily: 'TmoneyRoundWindRegular',
            color: '#ffffff',
            fontSize: width * 0.05,
            marginBottom: '-2%'
        },
        meaningBox: {
            width: '90%',
            backgroundColor: '#E4E4E4',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            marginBottom: width * 0.03
        },
        pinyinText: {
            fontFamily: 'KoPubWorld Dotum Medium',
            fontSize: width * 0.05,
            marginTop: width * 0.02,
            marginLeft: width * 0.02,
            marginRight: width * 0.02,
            color: '#8E8E8E'
        },
        meaningText: {
            fontFamily: 'TmoneyRoundWindRegular',
            fontSize: width * 0.05,
            color: '#3E3A39',
            marginLeft: width * 0.05,
            marginRight: width * 0.05,
        },
        plusButton: {
            width: width * 0.15,
            height: width * 0.15,
            display: 'flex',
            alignItems: 'center',
            borderRadius: (width * 0.15) / 2,
            elevation: 15,
            backgroundColor: '#ffffff',
            position: 'absolute',
            bottom: 0,
            left: 0,
            marginLeft: width * 0.07,
            marginBottom: width * 0.1
        },
        plusButtonText: {
            fontFamily: 'TmoneyRoundWindRegular',
            color: '#D14124',
            fontSize: width * 0.1,
            marginTop: width * 0.01
        },
        bottomUpdateBox: {
            width: '100%',
            height: width * 0.15,
            backgroundColor: '#D14124',
            position: 'absolute',
            bottom: 0,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            elevation: 10
        },
        bottomUpdateBar: {
            width: width * 0.003,
            height: width * 0.12,
            backgroundColor: '#ffffff'
        },
        bottomUpdateText: {
            fontFamily: 'TmoneyRoundWindRegular',
            color: '#ffffff',
            fontSize: width * 0.07,
            marginBottom: -(width * 0.03)
        }
    }
    if (width > 500) {
        return StyleSheet.create({
            ...commonPart,
            editMenuIcon: {
                ...commonPart.editMenuIcon,
                width: width * 0.05,
                height: width * 0.05,
            },
            card: {
                ...commonPart.card,
                minHeight: width * 0.2,
                marginBottom: width * 0.05,
                marginBottom: width * 0.04,
            },
            cardText: {
                ...commonPart.cardText,
                fontSize: width * 0.06,
                marginBottom: width * 0.02,
            },
            searchIconWrapper: {
                ...commonPart.searchIconWrapper,
                width: width * 0.05,
                height: width * 0.05,
                top: width * 0.035,
            },
            searchIcon: {
                width: width * 0.045,
                height: width * 0.045,
            },
            touchBoxText: {
                ...commonPart.touchBoxText,
                fontSize: width * 0.03,
            },
            pinyinText: {
                ...commonPart.pinyinText,
                fontSize: width * 0.03,
            },
            meaningText: {
                ...commonPart.meaningText,
                marginTop: width * 0.01,
                fontSize: width * 0.03,
            },
        });
    } 
    else if (width < 350) {
        return StyleSheet.create({
            ...commonPart,
            cardText: {
                ...commonPart.cardText,
                marginLeft: width * 0.1,
                marginRight: width * 0.1,
            },
            searchIcon: {
                width: width * 0.065,
                height: width * 0.065,
            },
        })
    }
    else {
        return StyleSheet.create({
            ...commonPart,
        });
    }
}

const styles = handleSize();
export default styles;

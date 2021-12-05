
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
            fontFamily: 'TmoneyRoundWindRegular',
            fontSize: width * 0.1,
            color: '#3E3A39',
            marginLeft: width * 0.05,
            marginRight: width * 0.05,
            marginBottom: width * 0.05,
        },
        editIconContainer: {
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
        },
        editIconWrapper: {
            width: width * 0.08,
            height: width * 0.08,
            marginTop: width * 0.035,
            marginRight: width * 0.035,
        },
        editIcon: {
            width: width * 0.08,
            height: width * 0.08,
        },
        plusButton: {
            width: width * 0.15,
            height: width * 0.15,
            display: 'flex',
            alignItems: 'center',
            borderRadius: (width * 0.15) / 2,
            elevation: 10,
            backgroundColor: '#ffffff',
            position: 'absolute',
            zIndex: 4,
            bottom: 0,
            left: 0,
            marginLeft: width * 0.07,
            marginBottom: width * 0.1
        },
        plusButtonText: {
            fontFamily: 'TmoneyRoundWindRegular',
            fontSize: width * 0.1,
            marginTop: width * 0.01
        }
    }
    if (width > 500) {
        return StyleSheet.create({
            ...commonPart,
            card: {
                ...commonPart.card,
                minHeight: width * 0.18
            },
            cardText: {
                ...commonPart.cardText,
                fontSize: width * 0.08
            },
            editIconWrapper: {
                ...commonPart.editIconWrapper,
                width: width * 0.06,
                height: width * 0.06
            },
            editIcon: {
                width: width * 0.06,
                height: width * 0.06
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

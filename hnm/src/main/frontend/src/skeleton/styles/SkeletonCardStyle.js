
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
            marginTop: width * 0.02,
        },
        card: {
            minHeight: width * 0.32,
            backgroundColor: '#f4f6fa',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            justifyContent: 'center',
            marginBottom: width * 0.05,
            elevation: 8
        },
        cardText: {
            height: width * 0.03, 
            backgroundColor: '#e1e2eb',
            borderTopLeftRadius: 7,
            borderTopRightRadius: 7,
            borderBottomLeftRadius: 7,
            borderBottomRightRadius: 7,
            marginLeft: width * 0.03,
            marginBottom: width * 0.015,
            marginTop: width * 0.015,
        }
    }
    if (width > 500) {
        return StyleSheet.create({
            ...commonPart,
            card: {
                ...commonPart.card,
                minHeight: width * 0.2,
                marginBottom: width * 0.05,
                marginBottom: width * 0.04,
            },
            cardText: {
                ...commonPart.cardText,
                height: width * 0.025, 
                marginLeft: width * 0.03,
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

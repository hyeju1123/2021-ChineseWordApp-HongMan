import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, TouchableWithoutFeedback, View, Text, Dimensions, Image } from 'react-native';
import customAxios from '../auth/customAxios';

import Images from './wordClassImageIndex';

function StudyWordDetail({ route }) {
    const { wordId, hanzi, intonation, sound, explanation } = route.params;
    const [marking, setMarking] = useState(false);

    const [meaningList, setMeaningList] = useState([]);
    const [loading, setLoading] = useState(true);

    const getMeaningList = () => {
        let config = { params: { wordNum: wordId }}
        customAxios().then(res => {
            res.get('/defaultWord/getWordMeanings', config)
            .then(res => {
                console.log(res.data);
                setMeaningList(res.data);
                // setLoading(false);
            })
            .catch(e => console.log(e))    
        })
    }

    // const getMeaningList = () => {
    //     let config = { params: { wordNum: wordId }}
    //     axios.get(`${LOCAL}/defaultWord/getWordMeanings`, config)
    //         .then(res => {
    //             console.log(res.data);
    //             setMeaningList(res.data);
    //             // setLoading(false);
    //         })
    //         .catch(e => console.log(e))
    // }

    const handleMarking = () => {
        setMarking(!marking);
    }

    const showWordClass = (wordClass) => {
        switch (wordClass) {
            case "명":
                return <Image style={styles.wordClassIcon} source={Images.wordClass.noun} />;
            case "대":
                return <Image style={styles.wordClassIcon} source={Images.wordClass.pronoun} />;
            case "동":
                return <Image style={styles.wordClassIcon} source={Images.wordClass.verb} />;
            case "형":
                return <Image style={styles.wordClassIcon} source={Images.wordClass.adjective} />;
            case "부":
                return <Image style={styles.wordClassIcon} source={Images.wordClass.adverb} />;
            case "개":
                return <Image style={styles.wordClassIcon} source={Images.wordClass.preposition} />;
            case "접":
                return <Image style={styles.wordClassIcon} source={Images.wordClass.conjunction} />;
            case "양":
                return <Image style={styles.wordClassIcon} source={Images.wordClass.quantifier} />;
            case "조":
                return <Image style={styles.wordClassIcon} source={Images.wordClass.postposition} />;
            case "조동":
                return <Image style={styles.wordClassIcon} source={Images.wordClass.auxiliary} />;
            default:
                break;
        }
    }

    let meanings = <Text>loading</Text>

    if (meaningList) {
        meanings = meaningList.map((data, index) => {
            let wordClassImg = showWordClass(data.wordClass);
            // console.log("src: ", imageSrc)
            return (
                <View key={index} style={styles.meaningContainer}>
                    {/* <Image style={styles.wordClassIcon} source={Images.wordClass.noun} /> */}
                    {wordClassImg}
                    <Text style={styles.meaning}>
                        {data.meanings}
                    </Text>
                </View>
            )
        }) 
    }

    useEffect(() => {
        getMeaningList();
    }, [])

    return (
        <ScrollView>
        <View style={styles.container}>
            <View style={styles.hanziCard}>
                <TouchableWithoutFeedback onPress={handleMarking}>
                    <Image
                        style={styles.icon}
                        source={
                            marking ?
                            require('../../images/lantern/CheckedLantern.png') :
                            require('../../images/lantern/UncheckedLantern.png')
                        }
                    />
                </TouchableWithoutFeedback>
                <Text style={styles.hanzi}>{hanzi}</Text>
                <Text style={styles.intonation}>{intonation}</Text>
                <Text style={styles.sound}>{sound}</Text>
            </View>
            <View style={styles.meaningCard}>
                {meanings}
            </View>
            <View style={styles.explanationCard}>
                <Text style={styles.explanation}>{explanation}</Text>
            </View>
        </View>
        </ScrollView>
    )
}

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#D14124',
        paddingTop: 10,
        paddingBottom: 30
    },
    hanziCard: {
        width: (width * 58) / 100,
        height: (height * 32.68) / 100,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        backgroundColor: '#ffffff',
        paddingTop: 17.73,
        marginBottom: 20,
        alignItems: 'center'  
    },
    icon: {
        width: 34.67,
        height: 40,
        position: 'absolute',
        top: (((height * 32.68) / 100) * 8.13) / 100,
        right: (((width * 58) / 100) * 5.6) / 100
    },
    hanzi: {
        fontSize: 100,
        fontFamily: 'MicrosoftJhengHeiUIBold-02',
        color: '#3F4443',
        marginBottom: -10,
    },
    intonation: {
        fontSize: 30,
        fontFamily: 'TmoneyRoundWindRegular',
        color: '#D14124',
        marginBottom: -15,
    },
    sound: {
        fontSize: 20,
        fontFamily: 'TmoneyRoundWindRegular',
        color: '#75787B'
    },
    meaningCard: {
        width: (width * 84) / 100,
        minHeight: (height * 12.9) / 100,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        backgroundColor: '#ffffff',
        paddingTop: 23,
        paddingBottom: 13,
        paddingLeft: 20,
        marginBottom: 20
    },
    meaningContainer: {
        width: (((width * 84) / 100) * 77.7) / 100,
        display: 'flex',
        flexDirection: 'row',
        paddingRight: 10,
        marginBottom: 10,
    },
    wordClassIcon: {
        width: (((width * 84) / 100) * 11.1) / 100,
        height: (((width * 84) / 100) * 11.1) / 100,
        marginRight: 15,
    },
    meaning: {
        fontSize: 25,
        fontFamily: 'TmoneyRoundWindRegular',
        color: '#3F4443'
    },
    explanationCard: {
        width: (width * 84) / 100,
        height: (height * 40) / 100,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        backgroundColor: '#ffffff',
        padding: 20,
        marginBottom: 20,
    },
    explanation: {
        fontSize: 25,
        fontFamily: 'TmoneyRoundWindRegular',
        lineHeight: 40,
        color: '#3F4443'
    }

});

export default StudyWordDetail

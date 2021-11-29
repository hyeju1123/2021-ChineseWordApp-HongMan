import React, { useState, useEffect, useCallback } from 'react'
import { View, Text, StyleSheet, Dimensions, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';
import customAxios from '../../auth/customAxios';
import check from '../../../images/module/check.png';
import checkedCheck from '../../../images/module/checkedCheck.png';

function ListeningHskThemePage({ navigation }) {

    const [quizType, setQuizType] = useState('word');
    const [themeAndLevel, setThemeAndLevel] = useState([]);
    const [chosenTheme, setChosenTheme] = useState([]);

    const getAllThemes = () => {
        customAxios().then(res => {
            res !== undefined &&
            res.get('/hskWord/getAllThemes')
            .then(res => {
                setThemeAndLevel(res.data)
            })
            .catch(e => console.log(e))
        })
    }

    const chooseThemes = useCallback(
        (level, theme) => {
            let newArray = chosenTheme;
            if (newArray.find(e => e.level === level && e.theme === theme) === undefined) {
                newArray.push({level, theme});
                console.log(newArray)
                setChosenTheme([
                    ...newArray,
                ]);
            } else {
                console.log(newArray)
                return
            }
        },
        [],
    )
    
    const getTextHanzi = () => {
        
        customAxios().then(res => {
            res !== undefined &&
            res.post('/hskWord/getQuizHanzi', chosenTheme)
            .then(res => {
                console.log('quiz:: ', res.data)
                navigation.navigate('ListeningQuizPage', { wordNum: 0, wordList: res.data, type: quizType })
            })
            .catch(e => console.log(e))
        })
    }

    let levelGroup = [1,2,3,4,5,6].map((item, index) => {
        return (
            <View key={index}>
                <TouchableOpacity style={styles.themeCard}>
                    <Text>HSK {item}급</Text>
                </TouchableOpacity>
                
                {
                    themeAndLevel.map((data, index) => 
                        item === data.level &&
                        
                            <TouchableOpacity onPress={() => chooseThemes(item, data.theme)} style={styles.themeCard} key={index}>
                                <Text>{data.theme}</Text>
                                {
                                    chosenTheme.find(e => e.level === item && e.theme === data.theme) === undefined
                                    ? <Image style={styles.checkIcon} source={check} />
                                    : <Image style={styles.checkIcon} source={checkedCheck} />
                                }
                            </TouchableOpacity>
                        
                    )
                }
            </View>
        )
    })     
                                    

    useEffect(() => {
        getAllThemes();
    }, [setChosenTheme])

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}>
                <View style={styles.cardContainer}>
                    <TouchableOpacity onPress={() => setQuizType('word')} style={styles.themeCard}>
                        <Text>한자로 보기</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setQuizType('meaning')} style={styles.themeCard}>
                        <Text>뜻으로 보기</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => getTextHanzi()} style={styles.themeCard}>
                        <Text>시험보기</Text>
                    </TouchableOpacity>
                    {levelGroup}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const width = Dimensions.get('window').width;
const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        display: 'flex',
        backgroundColor: '#D14124'
    },
    cardContainer: {
        width: '85%'
    },
    themeCard: {
        width: '100%',
        height: width * 0.1,
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: width * 0.05,
        elevation: 8
    },
    image: {
        width: width * 0.5,
        height: width * 0.5
    },
    checkIcon: {
        width: width * 0.05,
        height: width * 0.05
    },
    text: {
        fontFamily: 'TmoneyRoundWindExtraBold',
        fontSize: width * 0.07,
        color: '#8E8E8E',
        marginBottom: width * 0.03
    },
});

export default ListeningHskThemePage

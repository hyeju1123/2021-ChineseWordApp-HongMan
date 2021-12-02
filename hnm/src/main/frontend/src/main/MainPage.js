 import React from 'react';
 import { View, TouchableOpacity, StatusBar, SafeAreaView, ScrollView } from 'react-native';
 import styles from './style/MainPageStyle';
 
 import MainPageCard from './MainPageCard';
 import Images from '../ImageIndex';
 
 const MainPage = ({ navigation }) => {
 
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={'transparent'} translucent={true} />
      <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}>
      <View style={styles.cardContainer}>
          <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('StudyNavigation')}>
            <MainPageCard cardName={Images.mainPage.study} name="학습"  />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('VocaNavigation')}>
            <MainPageCard cardName={Images.mainPage.voca} name="단어장" />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('QuizNavigation')}>
            <MainPageCard cardName={Images.mainPage.test} name="시험" />
          </TouchableOpacity>
          <MainPageCard cardName={Images.mainPage.radical} name="부수" />
          <MainPageCard cardName={Images.mainPage.community} name="커뮤니티" />
          <MainPageCard cardName={Images.mainPage.dumpling} name="Project-HM" />
      </View>
      </ScrollView>
    </SafeAreaView>
  );
 };
 
 export default MainPage;
 
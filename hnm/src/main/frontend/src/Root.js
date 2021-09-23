import React, { useState, useEffect } from 'react';
import Splash from './main/Splash';
import StartNavigation from './navigation/StartNaviation';
import MainNavigation from './navigation/MainNavigation';
import { useDispatch, useSelector } from 'react-redux';
import { restoreToken } from './_modules/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from 'react-native-splash-screen';

const Root = () => {

  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  console.log("user: ", user);

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
    const bootstrapAsync = async () => {
      let token;
      try {
        token = await AsyncStorage.getItem('token');
        console.log("boot token: ", token)
        console.log("userToken: ", user.userToken)
      } catch (e) {
        console.log(e);
      }
      dispatch(restoreToken(token));
    }
    bootstrapAsync();
  }, [])

  if (user.isLoading) {
    return <Splash />
  }

  return (
    <>
    {
      user.userToken === null ?
      <StartNavigation /> :
      <>
      <MainNavigation />
      </>
    }
    </>
  )
};


export default Root;

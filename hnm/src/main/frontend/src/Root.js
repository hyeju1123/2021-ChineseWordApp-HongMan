import React, { useState, useEffect } from 'react';
import Splash from './main/Splash';
import StartNavigation from './navigation/StartNaviation';
import MainNavigation from './navigation/MainNavigation';
import { useDispatch, useSelector } from 'react-redux';
import { restoreToken } from './_modules/user';
import { handleAlertOff } from './_modules/alert';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from 'react-native-splash-screen';
import CustomAlert from './block/CustomAlert';

const Root = () => {

  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const alert = useSelector(state => state.alert);
  // console.log("user: ", user);
  // console.log("alert: ", alert)

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
    const bootstrapAsync = async () => {
      let token;
      try {
        token = await AsyncStorage.getItem('token');
        // console.log("boot token: ", token)
        // console.log("userToken: ", user.userToken)
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
        alert.visible &&
        <CustomAlert 
          offFunc={() => dispatch(handleAlertOff())}
          title={alert.title}
          message={alert.contents} 
          buttons={[
              {text: 'CANCEL',
              func: ()=>{}},
              {text: 'OK',
              func: alert.fc}
          ]}
        />
      }
      {
        user.userToken === null ?  
          <StartNavigation /> 
        : <MainNavigation />
      }
    </>
    // <>
    // {
    //   user.userToken === null ?
    //   <>
    //     {
    //       alert.visible &&
    //       <CustomAlert 
    //         offFunc={() => dispatch(handleAlertOff())}
    //         title={alert.title}
    //         message={alert.contents} 
    //         buttons={[
    //             // {text: 'no'},
    //             {text: 'OK',
    //             func: alert.fc}
    //         ]}
    //       />
    //     }
    //     <StartNavigation /> 
    //   </>
    //   :
    //     <MainNavigation />
    // }
    // </>
  )
};


export default Root;

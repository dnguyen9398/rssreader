import React, { useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import MainStackNavigator from './navigation/MainStackNavigation';
import {DefaultTheme, DarkTheme} from'@react-navigation/native'
import Intro from './screens/Intro';
const App = () => {
  const [darkApp, setDarkApp] = useState(false)
  const appTheme = darkApp ? DarkTheme : DefaultTheme;
  
  return (
    <MainStackNavigator>
    </MainStackNavigator>
  )
}
export default App;
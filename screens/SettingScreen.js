import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Switch, Text, View } from 'react-native';
import { BLACK, WHITE } from '../global/color';
import { EventRegister } from 'react-native-event-listeners'
import { useTheme } from '@react-navigation/native';

const SettingScreen = ({themes}) => {
  const [darkmode, setDarkMode] = useState()
  const {colors} = useTheme()
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    topView:{
      borderWidth: 0,
      width:'100%',
      height: '9%',
      justifyContent: 'center',
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.card
  },
  })
  return (
    <SafeAreaView
      style={styles.container}>
          <View style={styles.topView}>
            <View>
                <Text style={{fontSize: 20,fontWeight: 'bold', color: colors.text,}}>SETTING</Text>
            </View>
          </View>
          <View style={{margin: 15, alignItems:'center', flexDirection: 'row', justifyContent: 'center'}}>
            <View style={{flex: 1}}>
              <Text style={{fontSize: 16, fontFamily:'Newsreader', color: colors.text}}>Dark Mode</Text>
            </View>
            <View>
              <Switch
                value={darkmode}
                onValueChange={val => {
                  setDarkMode(val)
                  EventRegister.emit('changeThemeEvent', val)}}
              ></Switch>
            </View>
          </View>
    </SafeAreaView>
  )
}
export default SettingScreen;

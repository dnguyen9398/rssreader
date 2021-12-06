import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { BLACK, WHITE } from '../global/color';
import  WebView  from 'react-native-webview';
import { TouchableOpacity } from 'react-native';
import Icons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '@react-navigation/native';

const Browser = ({navigation, route}) => {
    const {url} = route.params
    const {colors} = useTheme()
    const styles = StyleSheet.create({
        container:{
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
                <TouchableOpacity style={{borderWidth: 0, left: 0, position: 'absolute', marginTop: 15, padding:10}}
                        onPress={()=>{navigation.goBack()}}>
                    <Icons name='arrow-back' color={colors.text} size={24} />
                </TouchableOpacity>
            </View>
            <WebView 
                startInLoadingState={true}
                source={{uri: url}}></WebView>
      </SafeAreaView>
  )
}


export default Browser;

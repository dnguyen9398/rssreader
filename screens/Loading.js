import { useTheme } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { ActivityIndicator, Image } from 'react-native';
import { SafeAreaView } from 'react-native';
import { StyleSheet } from 'react-native';
import { Text, View } from 'react-native';
import { LineDotsLoader } from 'react-native-indicator'
import { BLACK } from '../global/color';

const Loading = ({navigation, route}) => {
    const {colors} = useTheme()
    return (
        <View style={{zIndex: 20,position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, alignItems: 'center', justifyContent: 'center', borderWidth: 1, backgroundColor: '#F5FCFF88'}}>
            <LineDotsLoader
                    size={8}
                    color={colors.text}
                    dotsNumber={7} />
        </View>
  )
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
    }
})
export default Loading;
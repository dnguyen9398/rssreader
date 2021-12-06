import React, { useEffect,useState } from 'react';
import { Image, ImageBackground, View } from 'react-native';
import { LineDotsLoader } from 'react-native-indicator'
import { RICH_BLACK } from '../global/color';

const Intro = ({ navigation }) => {

    useEffect(() => {
        setTimeout(()=>{
            navigation.navigate('Tab')
        },3000)
    }, [])
    return (
        <View style={{ flex: 1, backgroundColor: '#FFF'}}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',  }}>
                <Image source={require('../assets/reader.jpg')} style={{width: 280, height: 280}}></Image>
                <LineDotsLoader
                    size={15}
                    color={RICH_BLACK}
                    dotsNumber={7} />
            </View>
        </View>
    );
}
export default Intro;
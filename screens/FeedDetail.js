import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Image, Linking,   } from 'react-native';
import { BLACK, BLUE_LINK, WHITE } from '../global/color';
import Icons from 'react-native-vector-icons/MaterialIcons';
import  WebView  from 'react-native-webview';
import { SaveFeed } from '../global/function';
import { useTheme } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const FeedDetail = ({navigation, route}) => {
    const {data} = route.params
    const {colors} = useTheme()
    const [dataSaved, setDataSaved] = useState([])
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
    const submitData = async() => {
        const note = {id: Date.now()}
        const saveData = [data,note]
        console.log(saveData)
        await AsyncStorage.setItem('note', JSON.stringify([...saveData]))
    }
    return (
        <SafeAreaView
            style={styles.container}>
            <View style={styles.topView}>
                <TouchableOpacity style={{borderWidth: 0, left: 0, position: 'absolute', marginTop: 15, padding:10}}
                        onPress={()=>{navigation.goBack()}}>
                    <Icons name='arrow-back' color={colors.text} size={24} />
                </TouchableOpacity>
                <TouchableOpacity style={{borderWidth: 0, right: 0, position: 'absolute', marginTop: 15, padding:10}}
                        onPress={submitData}>
                    <Icons name='favorite-border' color={colors.text} size={24} />
                </TouchableOpacity>
            </View>
            <View style={{margin: 15}}>
                <Text style={{fontFamily: 'Newsreader', fontSize: 20, fontWeight: 'bold', textAlign: 'left', color: colors.text}}>{data.title}</Text>
                <View style={{margin: 15}}>
                    <Text style={{fontSize: 12, color: colors.text}}>{data.published}</Text>
                </View>
                <View>
                    <Text style={{color: colors.text}}>{data.description}</Text>
                </View>
                <TouchableOpacity onPress={()=>{navigation.navigate('Browser',{
                    url : data.links[0].url
                })}}>
                    <Text style={{fontSize: 12, color: BLUE_LINK}}>{data.links[0].url }</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
  )
}


export default FeedDetail;

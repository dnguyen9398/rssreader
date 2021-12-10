import React, { useEffect, useState } from 'react';
import { Alert, FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BLACK, RICH_BLACK, WHITE } from '../global/color';
import { GetSaveFeed } from '../global/function';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '@react-navigation/native';
import { ToastAndroid } from 'react-native';
import Loading from './Loading';

const SavedScreen = ({navigation, route}) => {
  const [data, setData] = useState([])
  const [show, setShow] = useState(false)
  const [loading, setLoading] =useState(true)
  useEffect(() => {
    const rerender = navigation.addListener('focus',(e)=>{
      getFeeds()
      return rerender
    })
  }, [navigation])
  const getFeeds = async() =>{
    const result = await AsyncStorage.getItem('rss');
    if(result!= null){
      console.log(JSON.parse(result))
      setData(JSON.parse(result))
      setShow(true)
    }
    else{
      setShow(false)
    }
  }
  const delFeed = async() => {
    try{
      await AsyncStorage.removeItem('rss')
      getFeeds()
    }catch{
      ToastAndroid.show('Error !!', ToastAndroid.SHORT)
    }
  }
  const renderFeed = ( {item} ) => {
    return(
        <TouchableOpacity style = {styles.cardStyle}
            onPress={()=>{
                console.log(item)
                navigation.navigate('DetailSearch1',{
                  urlFeed: item.linkurl,
                })}}
            onLongPress={()=>{
              Alert.alert('Delete this item', 'Do you want to delete this item ?',[
                {
                  text: 'OK',
                  onPress: ()=>{delFeed()}
                },
                {
                  text: 'Cancel',
                }
              ],{
                cancelable: true
              })
            }}>
            <View style={{margin: 10, }}>
                <Text style= {{fontSize: 14, color: colors.text, fontFamily: 'Newsreader'}}>{item.linkurl}</Text>
            </View>
        </TouchableOpacity>
    )
}
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
    cardStyle:{
      margin: 15, 
      borderColor: RICH_BLACK,
      borderRadius: 22, 
      shadowColor: 'rgba(0,0,0, .4)', // IOS
      shadowOffset: { height: 1, width: 1 }, // IOS
      shadowOpacity: 1, // IOS
      shadowRadius: 1, //IOS
      backgroundColor: colors.card,
      elevation: 5,
    },
    })
  return (
      <SafeAreaView style={styles.container}>
          <View style={styles.topView}>
            <View>
                <Text style={{fontSize: 20, fontWeight: 'bold', color: colors.text}}>HISTORY</Text>
            </View>
          </View>
          {
            show ?
            <FlatList 
              data={data}
              keyExtractor={(item=>item.id)}
              renderItem={renderFeed}
            ></FlatList>
            : null
          }
        
      </SafeAreaView>
  )
}

export default SavedScreen;

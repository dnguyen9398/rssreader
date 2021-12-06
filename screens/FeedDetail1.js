import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, ImageBackground, } from 'react-native';
import { BLACK, WHITE } from '../global/color';
import Icons from 'react-native-vector-icons/MaterialIcons';
import { GetFeeds } from '../global/function';
import { useTheme } from '@react-navigation/native';

const FeedDetail1 = ({navigation, route}) => {
  const {url} = route.params;
  const [dataFeed, setDataFeed] = useState([])
  const [dataImage, setDataImage] = useState()

  const getFeeds = () => {
    GetFeeds(url)
      .then(res=>{
        console.log(res.image)
        setDataFeed(res.items)
      })
    }
    useEffect(() => {
        getFeeds()
    }, [])

  const _renderList = ({item}) => {
    return(
        <TouchableOpacity style={{padding: 15, borderWidth: 0.5, }}
            onPress={()=>{
              console.log(item)
              navigation.navigate('FeedDetail',{
                data : item
              })}}>
            <View>
                <Text style={{fontSize: 14, fontFamily: 'Newsreader', fontWeight: 'bold' , color: colors.text}}>{item.title}</Text>
            </View>
            <View>
                <Text style={{fontSize: 8}}>{item.published}</Text>
            </View>
        </TouchableOpacity>
    )
  }
  const {colors} = useTheme()
  const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: colors.background
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
        <FlatList
          data={dataFeed}
          renderItem={_renderList}
        ></FlatList>
    </SafeAreaView>
  )
}

export default FeedDetail1;

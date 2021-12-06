import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, ImageBackground, } from 'react-native';
import { BLACK, WHITE } from '../global/color';
import Icons from 'react-native-vector-icons/MaterialIcons';
import { GetFeeds } from '../global/function';
import { useTheme } from '@react-navigation/native';
import Loading from './Loading';

const DetailSearch = ({navigation, route}) => {
  const {name, urlFeed} = route.params;
  const [data, setData] = useState([])
  const [dataImage, setDataImage] = useState()
  const [loading , setLoading] = useState(true)

  const getFeeds = () => {
        GetFeeds(urlFeed)
          .then(res=>{
            // console.log(res.image)
            setData(res.items)
            setDataImage(res.image.url)
            setLoading(false)
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
          })
        }}>
        <View>
          <Text style={{fontSize: 14, fontFamily: 'Newsreader', fontWeight: 'bold', color: colors.text}}>{item.title}</Text>
        </View>
        <View>
          <Text style={{fontSize: 8, color: colors.text}}>{item.published}</Text>
        </View>
        <View style={{ zIndex: 1,  position: 'absolute', right: 15, bottom: 0, width: 35, height: 25}}>
            <ImageBackground source={{uri: dataImage}} resizeMode={'center'} style={{flex: 1,borderTopLeftRadius: 22, borderTopRightRadius: 22, overflow: 'hidden', }}></ImageBackground>
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
        { loading && 
          <Loading></Loading>
        }
        <View style={styles.topView}>
            <TouchableOpacity style={{borderWidth: 0, left: 0, position: 'absolute', marginTop: 15, padding:10}}
                onPress={()=>{navigation.goBack()}}>
                <Icons name='arrow-back' color={colors.text} size={24} />
            </TouchableOpacity>
            <View>
                <Text style={{fontSize: 20, fontWeight: '400', color: colors.text}}>{name}</Text>
            </View>
        </View>
        <FlatList
          data={data}
          renderItem={_renderList}
        ></FlatList>
    </SafeAreaView>
  )
}

export default DetailSearch;

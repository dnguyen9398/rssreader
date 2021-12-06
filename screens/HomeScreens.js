import { useTheme } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Image, ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native';
import { BLACK, RICH_BLACK, WHITE } from '../global/color';
import { Sites } from '../global/datasample';
import { GetFeeds } from '../global/function';
import Loading from './Loading';

const HomeScreens = ({navigation}) => {
    const [data, setData] = useState([])
    const [dataImage, setDataImage] = useState()
    const [loading , setLoading] = useState(true)
    useEffect(() => {
        getFeeds()
    }, [])

    const getFeeds = () => {
        const url = 'http://rss.cnn.com/rss/edition_world.rss'
        GetFeeds(url).then((res) =>{
            // console.log(JSON.stringify(res.items))
            setData(res.items)
            setDataImage(res.image.url)
            setLoading(false)
        })
    }
    const renderFeed = ( {item} ) => {
        
        return(
            <TouchableOpacity style = {styles.cardStyle}
                onPress={()=>{
                    console.log(item)
                    navigation.navigate('FeedDetail',{
                    data :  item,
                    })}}>
                <View style={{ zIndex: 1,  position: 'absolute', right: 15, bottom: 0, width: 35, height: 25, }}>
                    <ImageBackground source={{uri: dataImage}} resizeMode={'center'} style={{flex: 1,borderTopLeftRadius: 22, borderTopRightRadius: 22, overflow: 'hidden', }}></ImageBackground>
                </View>
                <View style={{margin: 10, }}>
                    <Text style= {{fontSize: 14, color: colors.text, fontFamily: 'Newsreader'}}>{item.title}</Text>
                </View>
            </TouchableOpacity>
        )
    }
    const topList = () =>{
        return(
            <View style={{marginLeft: 15,}}>
                <Text style={{fontSize: 18, fontFamily: 'Newsreader', fontWeight: 'bold', color: colors.text}}>Feature</Text>
            </View>
        )
    }

    const SiteList = () =>{
        return(
            <FlatList
                data={Sites}
                keyExtractor={item => item.name}
                horizontal={true}
                renderItem={({item})=>{
                    return(
                        <View style={{ marginBottom: 20, marginRight: 15, marginTop: 15}}>
                            <TouchableOpacity style={{borderWidth: 0, width: 100, height: 55,}}
                                onPress={()=>{navigation.navigate('DetailSearch1',{
                                    urlFeed: item.url
                                })}}>
                                <ImageBackground source={{uri: item.image}} resizeMode={'center'} style={{flex: 1,borderTopLeftRadius: 22, borderTopRightRadius: 22, overflow: 'hidden', }}></ImageBackground>
                            </TouchableOpacity>
                        </View>
                    )
                }}
            ></FlatList>
        )
    }
    const FeedList = () => {
        return(
            <FlatList 
                data={data.slice(0,10)}
                keyExtractor={item => item.guid}
                renderItem={renderFeed}
                ListHeaderComponent={topList}
                ListFooterComponent={()=>{
                    return(
                        <View style={{margin: 15}}>
                            <Text style={{fontSize: 18, fontFamily: 'Newsreader', fontWeight: 'bold', color:colors.text}}>Top Sites</Text>
                            <SiteList></SiteList>
                        </View>
                    )
                }}
            ></FlatList>  
        )
    }
    const {colors} = useTheme()
    const styles = StyleSheet.create({
        container:{
            flex: 1,
        },
        cardStyle:{
            margin: 15, 
            borderColor: RICH_BLACK,
            borderRadius: 22, 
            shadowColor: 'rgba(0,0,0, .4)', // IOS
            shadowOffset: { height: 1, width: 1 }, // IOS
            shadowOpacity: 1, // IOS
            shadowRadius: 1, //IOS
            backgroundColor: colors.border,
            elevation: 5,
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
    <SafeAreaView style={styles.container}>
        {
            loading && 
            <Loading></Loading>
        }
        <View style={styles.topView}>
            <View>
                <Text style={{fontSize: 20, fontWeight: 'bold', color: colors.text}}>HOME</Text>
            </View>
        </View>
        <View style={{marginLeft: 15,marginBottom: 15}}>
            <Text style={{fontFamily:'Newsreader', fontSize: 46, color: colors.text}}>Daily News</Text>
        </View>
        <FeedList></FeedList>
    </SafeAreaView>
  )
}


export default HomeScreens;

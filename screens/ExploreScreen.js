import React, { useState } from 'react';
import { ImageBackground, SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { BLACK, RICH_BLACK, WHITE } from '../global/color';
import Icons from 'react-native-vector-icons/MaterialIcons';
import { Data } from '../global/datasample';
import { useTheme } from '@react-navigation/native';
import { SaveFeed } from '../global/function';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addFeeds } from '../database/feedhistory';

const ExploreScreen = ({navigation}) => {
    const [link, setLink] = useState()
    const renderView = ({item}) => {
        return(
            <TouchableOpacity style={styles.buttoncategory} 
                onPress={()=>{navigation.navigate('DetailSearch', {
                    name : item.name, 
                    urlFeed : item.url1
                    })}}>
                <ImageBackground source={item.pic} style={styles.image} blurRadius={12}>
                    <Text style={{color: '#000000'}}>{item.name}</Text>
                </ImageBackground>
            </TouchableOpacity>
        )
}
    const {colors} = useTheme()

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor:colors.background
        },
        buttoncategory: {
            height: 160,
            borderColor: 'black', 
            flex: 1, 
            margin: 15,
            borderRadius: 10,
            justifyContent:'center',
            shadowColor: 'rgba(0,0,0, .4)', // IOS
            shadowOffset: { height: 1, width: 1 }, // IOS
            shadowOpacity: 1, // IOS
            shadowRadius: 1, //IOS
            backgroundColor: colors.card,
            elevation: 5,
        },
        image:{
            height: 160,
            borderRadius: 10,
            overflow:'hidden',
            alignItems:'center',
            justifyContent:'center'
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
    const saveData = [{
        linkurl: link,
        id: Date.now()
    }]
    console.log('data saved: '+ saveData)
    await AsyncStorage.setItem('rss', JSON.stringify([...saveData]))
    navigation.navigate('DetailSearch1',{
        urlFeed: link
    })
    addFeeds(link)
}
    return (
        <SafeAreaView
            style={styles.container}>
            <View style={styles.topView}>
                <View>
                    <Text style={{fontSize: 20, fontWeight: 'bold', color: colors.text}}>SEARCH</Text>
                </View>
            </View>
            <View style={{margin: 15}}>
                <TextInput style={{backgroundColor:'silver', borderRadius: 20, paddingLeft: 20}} placeholder={'Paste URL here' }
                    onEndEditing={()=>submitData()}
                    onChangeText={text => {
                        setLink(text)
                    }}>
                </TextInput>
            </View>
            <FlatList 
                data={Data}
                renderItem={renderView}
                keyExtractor={item => item.name}
                numColumns={3}
            ></FlatList>
        </SafeAreaView>
    )
}

export default ExploreScreen;

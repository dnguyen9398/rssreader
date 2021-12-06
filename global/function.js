import AsyncStorage from '@react-native-async-storage/async-storage';
import * as rssParser from 'react-native-rss-parser';

export const GetFeeds = async(url) => {
    const responseFeed =  await fetch(url)
        .then((response) => response.text())
        .then( async(responseData) => {
            const rss = await rssParser.parse(responseData)
            // console.log(JSON.stringify(rss.image.url))
            return rss;
        })
    const responseJSON =  responseFeed
    return responseJSON;
}

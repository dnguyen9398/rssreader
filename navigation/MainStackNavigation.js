import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer,DefaultTheme, DarkTheme, useTheme } from '@react-navigation/native';

import React, { useEffect, useState } from 'react';
import { Text, View, useWindowDimensions } from 'react-native';
import HomeScreens from '../screens/HomeScreens';
import ExploreScreen from '../screens/ExploreScreen';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import SettingScreen from '../screens/SettingScreen';
import { BLACK, RICH_BLACK } from '../global/color';
import Icons from 'react-native-vector-icons/MaterialIcons';
import SavedScreen from '../screens/SavedScreen';
import DetailSearch from '../screens/DetailSearch';
import DetailSearch1 from '../screens/DetailSearch1';
import FeedDetail from '../screens/FeedDetail';
import Browser from '../screens/Browser';
import { EventRegister } from 'react-native-event-listeners'
import { Dark } from '../theme/dark';
import FeedDetail1 from '../screens/FeedDetail1';
import Intro from '../screens/Intro';

const Stack = createStackNavigator()
const Tab = createMaterialBottomTabNavigator();

function HomeStack(){   
    return(
        <Stack.Navigator >
            <Stack.Screen name='Home' component={HomeScreens}
                options={{ headerShown: false }}></Stack.Screen>
            <Stack.Screen name='DetailSearch1' component={DetailSearch1}
                options={{ headerShown: false}}></Stack.Screen>
            <Stack.Screen name='FeedDetail' component={FeedDetail}
                options={{headerShown: false}}></Stack.Screen>
            <Stack.Screen name='Browser' component={Browser}
                options={{headerShown: false}}></Stack.Screen>
        </Stack.Navigator>
    )
}

function ExploreStack(){
    return(
        <Stack.Navigator>
            <Stack.Screen name='Explore' component={ExploreScreen}
                options={{ headerShown: false }}></Stack.Screen>
            <Stack.Screen name='DetailSearch' component={DetailSearch}
                options={{ headerShown: false}}></Stack.Screen>
            <Stack.Screen name='DetailSearch1' component={DetailSearch1}
                options={{ headerShown: false}}></Stack.Screen>
            <Stack.Screen name='FeedDetail' component={FeedDetail}
                options={{headerShown: false}}></Stack.Screen>
            <Stack.Screen name='Browser' component={Browser}
                options={{headerShown: false}}></Stack.Screen>
        </Stack.Navigator>
    )
}

function SettingStack(){
    return(
        <Stack.Navigator>
            <Stack.Screen name='Setting' component={SettingScreen}
                options={{ headerShown: false }}></Stack.Screen>

            
        </Stack.Navigator>
    )
}

function SaveStack(){
    return(
        <Stack.Navigator>
            <Stack.Screen name='Saved' component={SavedScreen}
                options={{ headerShown: false }}></Stack.Screen>
            <Stack.Screen name='FeedDetail1' component={FeedDetail1}
                options={{headerShown: false}}></Stack.Screen>
            <Stack.Screen name='FeedDetail' component={FeedDetail}
                options={{headerShown: false}}></Stack.Screen>
            <Stack.Screen name='DetailSearch1' component={DetailSearch1}
                options={{ headerShown: false}}></Stack.Screen>
        </Stack.Navigator>
    )
}
function TabNavigation() {
    const {colors} = useTheme()
    return(
        <Tab.Navigator 
            barStyle={{ backgroundColor: colors.card}}>
                <Tab.Screen name='HomeTab' component={HomeStack} 
                options={{
                    tabBarLabel:'Home',
                    tabBarIcon: ({ color, size }) => (
                        <Icons name="home" color={colors.text} size={24} />
                      ),
                }}></Tab.Screen>
                <Tab.Screen name='ExploreTab' component={ExploreStack}
                options={{
                    tabBarLabel:'Search',
                    tabBarIcon: ({ color, size }) => (
                        <Icons name="search" color={colors.text} size={24} />
                      ),
                }}></Tab.Screen>
                <Tab.Screen name='SavedTab' component={SaveStack}
                options={{
                    tabBarLabel: 'History',
                    tabBarIcon: ({ color, size }) => (
                        <Icons name="history" color={colors.text} size={24} />
                      ),
                }}></Tab.Screen>
                <Tab.Screen name='SettingTab' component={SettingStack}
                options={{
                    tabBarLabel: 'Setting',
                    tabBarIcon: ({ color, size }) => (
                        <Icons name="settings" color={colors.text} size={24} />
                      ),
                }}></Tab.Screen>
          </Tab.Navigator>
    )
}
function MainStackNavigator() {
    const {colors} = useTheme()
    const [darkApp, setDarkApp] = useState(false)
    const appTheme = darkApp ? Dark : DefaultTheme;
    useEffect(() => {
        let eventListener = EventRegister.addEventListener('changeThemeEvent', data=>{
            setDarkApp(data)
        },)
        return ()=>{
            EventRegister.removeEventListener(eventListener)
        }
    }, [])
    return (
      <NavigationContainer theme={appTheme}>
          <Stack.Navigator initialRouteName={'Intro'}>
                <Stack.Screen name={'Intro'} component={Intro}
                    options={{ headerShown: false }}></Stack.Screen>
                <Stack.Screen name={'Tab'} component={TabNavigation}
                    options={{ headerShown: false }}></Stack.Screen>
          </Stack.Navigator>
      </NavigationContainer>
    );
  }
  
  export default MainStackNavigator;
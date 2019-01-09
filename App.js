import React, { Component } from 'react';
import { Ionicons as Icon } from '@expo/vector-icons';
import { StyleSheet, Text, View, AppRegistry, Button, Platform, TouchableHighlight, TextInput, ScrollView, TouchableWithoutFeedback, Keyboard } from "react-native";
import {createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import MapScreen from './map';
import FormScreen from './form';
import FriendsScreen from './friends';

import SignUp from './signup';
import Login from './login';

const MainNavigator = createBottomTabNavigator( {
    Map: {
        screen: MapScreen,
        navigationOptions: {
            tabBarLabel: 'Map',
            tabBarIcon: ({ tintColor, focused }) => (
              <Icon
                name="ios-map"
                size={24}
                style={{ color: tintColor, paddingTop: 5 }}
              />
            )
        }
    },
    Form: { 
        screen: FormScreen, 
        navigationOptions: {
            tabBarLabel: 'Form',
            tabBarIcon: ({ tintColor, focused }) => (
              <Icon
                name="ios-folder"
                size={24}
                style={{ color: tintColor, paddingTop: 5 }}
              />
            )
        }
    },
    Friends: {
        screen: FriendsScreen,
        navigationOptions: {
            tabBarLabel: 'Friends',
            tabBarIcon: ({ tintColor, focused }) => (
              <Icon
                name="ios-people"
                size={24}
                style={{ color: tintColor, paddingTop: 5 }}
              />
            )
        }
    }
}, {
    initialRouteName: 'Map',
    order: ['Map', 'Form', 'Friends'],
    //navigation for complete tab navigator
    navigationOptions: {
        tabBarVisible: true
    },
    tabBarOptions: {
        activeTintColor: 'white',
        inactiveTintColor: '#72c19f',
        style: {
            backgroundColor: '#408e6c' // TabBar background
        }
    }
});

//https://medium.com/react-native-training/react-native-firebase-authentication-7652e1d2c8a2
const App = createStackNavigator({
    Login: {screen: Login,
        navigationOptions: {
            header: null,
        }
    },
    SignUp: {screen: SignUp,
        navigationOptions: {
            header: null,
        }
    },
    MainNav: {screen: MainNavigator,
        navigationOptions: {
            header: null,
            //gesturesEnabled: false,
        }
    },
});

export default App;
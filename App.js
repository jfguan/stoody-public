import React, { Component } from 'react';
import { Ionicons as Icon } from '@expo/vector-icons';
import { StyleSheet, Text, View, AppRegistry, Button, Platform, TouchableHighlight, TextInput, ScrollView, TouchableWithoutFeedback, Keyboard } from "react-native";
import {createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import MapScreen from './map';
import FormScreen from './form';
import FriendsScreen from './friends';

import Loading from './loading';
import SignUp from './signup';
import Login from './login';

const MainNavigator = createBottomTabNavigator( {
	  Map: {
        screen: MapScreen,
        navigationOptions: {
            title: 'Map',
            tabBarIcon: ({ tintColor, focused }) => (
              <Icon
                name="ios-map"
                size={24}
                style={{ 
                    justifyContent: 'center',
                    color: tintColor,
                    paddingTop: 5 }}
              />
            ),
        },
      },
	  Form: { 
        screen: FormScreen, 
        navigationOptions: {
            tabBarLabel: 'Form',
            tabBarIcon: ({ tintColor, focused }) => (
              <Icon
                name="ios-folder"
                size={24}
                style={{ 
                    color: tintColor,
                    paddingTop: 5 
                }}
              />
            ),
        },
	  },
	  Friends: {
        screen: FriendsScreen,
        navigationOptions: {
            tabBarLabel: 'Friends',
            tabBarIcon: ({ tintColor, focused }) => (
              <Icon
                name="ios-people"
                size={24}
                style={{ 
                    color: tintColor,
                    paddingTop: 5 
                }}
              />
            ),
        },
	  },
	},

);

//https://medium.com/react-native-training/react-native-firebase-authentication-7652e1d2c8a2
const App = createStackNavigator({
  Login: {screen: Login,
          navigationOptions: {
            header: null 
        }
  },
  MainNav: {screen: MainNavigator,
        navigationOptions: {
            header: null 
        }
  },
  SignUp: {screen: SignUp,
          navigationOptions: {
            header: null 
        }
  },
});

export default App;
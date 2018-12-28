import React, { Component } from 'react';
import { StyleSheet, Text, View, AppRegistry, Button, Platform, TouchableHighlight, TextInput, ScrollView, TouchableWithoutFeedback, Keyboard } from "react-native";
import 'firebase/firestore';
import firebaseApp from './Config/FirebaseConfig';
import styles from './styles'

const settings = { timestampsInSnapshots: true};
const db = firebaseApp.firestore();
db.settings(settings);

//======================SCREEN CONTAINING FRIENDS==========================
export default class FriendsScreen extends React.Component {
    handleSubmit = () => { }
    
    constructor(props) {
    super(props)
      this.state = { 
          username: "",
          placeholder: "enter username",
          currentUser: null
      }
    } 
    
    //retrieves and sets currentUser state
    componentDidMount() {
      const { currentUser } = firebaseApp.auth()
      this.setState({ 
        ...this.state,
        currentUser: currentUser,
      })
    }
    

    render() {
        const { currentUser } = this.state
        return (
          <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible = {false}>
            <View style={{ flex: 4, justifyContent: 'center', alignItems: 'center'}}>
                <TextInput style = {styles.addFriendInput}
                    value={this.state.username}
                    placeholder = "enter username"
                />
                <TouchableHighlight style={styles.button} onPress={this.handleSubmit} underlayColor='#868c82'>
                  <Text style={styles.buttonText}>add/remove</Text>
                </TouchableHighlight>
                <View style = {{height:100}}/>
                
                <Text style = {styles.friendTitle} >
                    friends
                </Text>
                <Text style = {styles.lineStyle} >
                    --------------------------------------------------------
                </Text>
                <Text style = {styles.friendNameStyle} >
                  {currentUser && currentUser.email} 
                </Text>
                
                <Text style = {styles.friendNameStyle} >
                    chaitea
                </Text>
                
                <Text style = {styles.friendNameStyle} >
                    erchen
                </Text>
                
                <Text style = {styles.friendNameStyle} >
                    gadkari
                </Text>
            </View>
          </TouchableWithoutFeedback>
        );
    }
}

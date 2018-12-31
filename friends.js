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
    //TODO ADD REMOVE FRIENDS

    handleSubmit = () => {
      const { currentUser } = this.state
      //Look for if 'other user' friendReq'd 'user'
      const usersRef = db.collection('users');
      friendReq = usersRef.doc(this.state.addUserByEmail).collection('friendReqs').doc(currentUser.email);
      friendReq.get()
        .then((docSnapshot) => {
            //If friendReq existed, move both users from 'friendReqs' to 'friends' collections
            if (docSnapshot.exists) {
              //Add friendship to both users
              usersRef.doc(this.state.addUserByEmail).collection('friends').doc(currentUser.email).set({});
              usersRef.doc(currentUser.email).collection('friends').doc(this.state.addUserByEmail).set({});
              //Remove friend request
              usersRef.doc(this.state.addUserByEmail).collection('friendReqs').doc(currentUser.email).delete();
            }
            //Else add 'other user' to friendReq collection.
            else {
              usersRef.doc(currentUser.email).collection('friendReqs').doc(this.state.addUserByEmail).set({});
            }
      });
      console.log(this.state.addUserByEmail);
    }
    
    constructor(props) {
    super(props)
      this.state = { 
          addUserByEmail: "",
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
                    onChangeText={(addUserByEmail) => this.setState({addUserByEmail})}
                    placeholder = "enter friend's email"
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

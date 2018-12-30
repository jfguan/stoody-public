import React, { Component } from 'react';
import { StyleSheet, Text, View, AppRegistry, Button, Platform, TouchableHighlight, TextInput, ScrollView, TouchableWithoutFeedback, Keyboard } from "react-native";
import { Constants, Location, Permissions} from "expo";
import * as firebase from 'firebase';
import firebaseApp from './Config/FirebaseConfig';
import styles from './styles'

const settings = { timestampsInSnapshots: true};
const db = firebaseApp.firestore();
db.settings(settings);

//======================SCREEN CONTAINING FORM=========================
export default class FormScreen extends React.Component {
  constructor(props) {
	  super(props);
	  this.state = {
        currentUser: null,
	  	  subject: "",
        description: "",
        g_loc: null,
        stoodying: false,
	  };
	  this.handleSubmit = this.handleSubmit.bind(this)
  }

  //Get user from auth and set in this.state
  componentDidMount() {
      const { currentUser } = firebaseApp.auth()
      this.setState({ 
        ...this.state,
        currentUser: currentUser,
      })
  }

  //https://medium.com/react-native-training/firebase-sdk-with-firestore-for-react-native-apps-in-2018-aa89a67d6934
  //https://stackoverflow.com/questions/47308159/whats-the-best-way-to-check-if-a-firestore-record-exists-if-its-path-is-known
  
  //function that changes user to "currently studying"
  //updates user's location/subject/description in database
  start_stoody = () => {
    this._getLocationAsync();
    const { currentUser } = this.state;
    console.log("start_stoody");
    var user = db.collection('users').doc(currentUser.email)
    var getDoc = user.get()
    .then(doc => {
        if (!doc.exists) {
            console.log('User not in DB, creating user?');
             db.collection('users').doc(currentUser.email).set({
              subject: this.state.subject, 
              description: this.state.description, 
              g_loc: new firebase.firestore.GeoPoint(this.state.g_loc.coords.latitude, this.state.g_loc.coords.longitude),
            })
        } else {
          user.update({
            subject: this.state.subject, 
            description: this.state.description, 
            g_loc: new firebase.firestore.GeoPoint(this.state.g_loc.coords.latitude, this.state.g_loc.coords.longitude)
          });
        }
    })
    .catch(err => {
        console.log('Error getting document', err);
    });

  }
  
  //function that changes user to "not studying"
  //sends user to antartica
  stop_stoody = () => {
    const { currentUser } = this.state;
    db.collection('users').doc(currentUser.email).update({
    g_loc: new firebase.firestore.GeoPoint(-90, 0)});
  }

  //called by submit button 
  //modifies user's state to studying/not studying by respective functions
  handleSubmit = () => {
    if(this.state.stoodying){
      this.setState({
          ...this.state,
          stoodying : false,
          text: "Confirm"
      }, this.stop_stoody);
    }
    else{
      this.setState({
          ...this.state,
          stoodying: true,
          text: "Delete"
      }, this.start_stoody);
    }
  }

  //gets user's location when screen loads
  componentWillMount() {
    this._getLocationAsync();
  }

  //gets users location
  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let g_loc = await Location.getCurrentPositionAsync({});
    this.setState({ g_loc });
  };

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible = {false}>
        <View style={{ flex: 4, justifyContent: 'center', alignItems: 'center'}}>
            //subject input field
            <TextInput style = {styles.usernameInput} 
                onChangeText={(subject) => this.setState({subject})}
                value={this.state.subject}
                placeholder='subject'
                returnKeyType='done'
            />
            <Text style = {styles.lineStyle} >
                --------------------------------------------------------
            </Text>
            //description input field
            <TextInput style = {styles.descriptionInput}
                placeholder="description: location, time, etc."
                onChangeText={(description) => this.setState({description})}
                multiline={true}
                maxLength = {40}
                numberOfLines={5}
            />
            //confirm button
            <TouchableHighlight style={styles.button} onPress={this.handleSubmit} underlayColor='#868c82'>
                <Text style={styles.buttonText}>confirm</Text>
            </TouchableHighlight>
        </View>
      </TouchableWithoutFeedback> 
    );
  }
}

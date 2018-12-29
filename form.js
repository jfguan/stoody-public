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
        name: "",
	  	  subject: "",
        description: "",
        g_loc: null,
        confirmed: false,
	  };
	  this.handleSubmit = this.handleSubmit.bind(this)
  }

  //https://stackoverflow.com/questions/47308159/whats-the-best-way-to-check-if-a-firestore-record-exists-if-its-path-is-known
  //function that changes user to "currently studying"
  //updates user's location/subject/description in database
  start_stoody = () => {
 	this._getLocationAsync();
 	var users = db.collection('users');
    //crashes code
    console.log(this.state.g_loc);
 	var new_user = users.doc("bob").update({
    subject: this.state.subject, 
    description: this.state.description, 
    g_loc: new firebase.firestore.GeoPoint(this.state.g_loc.coords.latitude, this.state.g_loc.coords.longitude)});
  }
  
  //function that changes user to "not studying"
  //sends user to antartica
  stop_stoody = () => {
    var users = db.collection('users');
    var new_user = users.doc("bob").update({
    g_loc: new firebase.firestore.GeoPoint(-90, 0)});
  }

  //called by submit button 
  //modifies user's state to studying/not studying by respective functions
  handleSubmit = () => {
    if(this.state.confirmed){
      this.setState({
          ...this.state,
          confirmed : false,
          text: "Confirm"
      }, this.stop_stoody);
    }
    else{
      this.setState({
          ...this.state,
          confirmed: true,
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

import React, { Component } from 'react';
import { StyleSheet, Text, View, AppRegistry, Button, Platform, TouchableHighlight, TextInput, ScrollView, TouchableWithoutFeedback, Keyboard } from "react-native";
import { Constants, Location, Permissions} from "expo";
import 'firebase/firestore';
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

  start_stoody = () => {
 	this._getLocationAsync();
 	var users = db.collection('users');
 	console.log("this.state");
 	console.log(this.state);
 	var new_user = users.doc("Jeff Guan").set({
    subject: this.state.subject, 
    description: this.state.description, 
    g_loc: new firebase.firestore.GeoPoint(this.state.g_loc.coords.latitude, this.state.g_loc.coords.longitude)});
  }

  stop_stoody = () => {
    var users = db.collection('users');
    var new_user = users.doc("Jeff Guan").set({
    g_loc: new firebase.firestore.GeoPoint(-90, 0)});
  }

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

  componentWillMount() {
    this._getLocationAsync();
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let g_loc = await Location.getCurrentPositionAsync({});
    console.log(g_loc);
    this.setState({ g_loc });
  };

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible = {false}>
        <View style={{ flex: 4, justifyContent: 'center', alignItems: 'center'}}>
            <TextInput style = {styles.usernameInput} 
                ref= {(el) => { this.subject = el; }}
                onChangeText={(subject) => this.setState({subject})}
                value={this.state.subject}
                placeholder='subject'
                returnKeyType='done'
            />
            <Text style = {styles.lineStyle} >
                --------------------------------------------------------
            </Text>
            <TextInput style = {styles.descriptionInput}
                placeholder="description: location, time, etc."
                ref= {(el) => { this.description = el; }}
                onChangeText={(description) => this.setState({description})}
                multiline={true}
                maxLength = {40}
                numberOfLines={5}
            />
            <TouchableHighlight style={styles.button} onPress={this.handleSubmit} underlayColor='#868c82'>
                <Text style={styles.buttonText}>confirm</Text>
            </TouchableHighlight>
        </View>
      </TouchableWithoutFeedback> 
    );
  }
}

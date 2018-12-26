import React, { Component } from 'react';
import { Ionicons as Icon } from '@expo/vector-icons';
import { StyleSheet, Text, View, AppRegistry, Button, Platform, TouchableHighlight, TextInput, ScrollView, TouchableWithoutFeedback, Keyboard } from "react-native";
import { Constants, Location, Permissions} from "expo";
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import 'firebase/firestore';

import firebaseApp from './Config/FirebaseConfig';

const settings = { timestampsInSnapshots: true};
const db = firebaseApp.firestore();
db.settings(settings);

import MapScreen from './map'

//======================SCREEN CONTAINING FORM=========================
class FormScreen extends React.Component {
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

//======================SCREEN CONTAINING FRIENDS==========================
class FriendsScreen extends React.Component {
    handleSubmit = () => { }
    
    constructor(props) {
    super(props)
      this.state = { 
          username: "",
          placeholder: "enter username",
          currentUser: null
      }
    } 
    
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
//                  onChangeText={(text) => this.setusername(text)} //function that should do something with the input?
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

const MainNavigator = createBottomTabNavigator(
	{
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
			            style={{ color: tintColor,
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
			            style={{ color: tintColor,
		            			     paddingTop: 5 
                        }}
			          />
			        ),
		    	},
	  },
	},

);

import Loading from './loading'
import SignUp from './signup'
import Login from './login'

//https://medium.com/react-native-training/react-native-firebase-authentication-7652e1d2c8a2
const App = createStackNavigator({
//  Loading: {screen: Loading,
//          navigationOptions: {
//            header: null 
//        }
//  },
  SignUp: {screen: SignUp,
          navigationOptions: {
            header: null 
        }
  },
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
});

export default App;

const styles = StyleSheet.create({
    mainFont: {
        fontFamily: 'Futura',
        color: '#3b3b3b',
        fontSize: 28,
        alignItems: 'center',
        textAlign: 'center',
    },
    addFriendInput: {
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Futura',
        fontSize: 23,
        marginBottom: 8,
        marginTop: -4,
        borderColor: 'gray',
        borderWidth: 0,
        borderRadius: 24,
    },
    usernameInput: {
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Futura',
        fontSize: 31,
        marginBottom: -8,
    },
    friendTitle: {
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Futura',
        fontSize: 28,
        marginBottom: -14,
        letterSpacing: 4,
        fontWeight: 'bold',
    },
    descriptionInput: {
        justifyContent: 'center',
        alignItems: 'center',
        color: '#5d6777',
        fontFamily: 'Futura',
        marginTop: 80,
        marginBottom: 175,
        fontSize: 23,
        maxHeight: 275,
        textAlign: 'center',
        width: 320,
    },
    lineStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        color: '#3b3b3b',
        fontFamily: 'Futura',
        fontSize: 23,
        marginBottom: 0,
    },
    friendNameStyle: {
//        fontWeight: 'bold',
        color: '#85c667',
        fontFamily: 'Futura',
        fontSize: 23,
        marginBottom: 20,
        letterSpacing: 3,
    },
    navBar: {
		color: 'green',
    	flex: 1,
    	flexDirection: 'row',
    	alignItems: 'center',
    	backgroundColor: 'red',
    	justifyContent: 'center',
    	tintColor: 'red',
    },
    scrollContainer: {
        //justifyContent: 'center',
        //padding: 20,
  	},
    //controls the 'confirm' and 'add/remove' button on form
    button: {
        backgroundColor: '#3b3b3b',
        borderRadius: 24,
        marginBottom: 70,
        alignSelf: 'center',
        justifyContent: 'center',
        width: 250,
        height: 42,
    },
    buttonText: {
        fontFamily: 'Futura',
        fontSize: 18,
        color: 'white',
        alignSelf: 'center'
    },
});



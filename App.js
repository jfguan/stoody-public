import React, { Component } from 'react';
import { Ionicons as Icon } from '@expo/vector-icons';
//import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View, AppRegistry, Button, Platform, TouchableHighlight, TextInput, ScrollView } from "react-native";
import { Constants, Location, Permissions} from "expo";
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import * as firebase from 'firebase';
import 'firebase/firestore';
//import Ionicons from 'react-native-vector-icons/Ionicons';

// Initialize Firebase
const firebaseConfig = {
	apiKey: "",
	authDomain: "stoody-7c7e1.firebaseapp.com",
	databaseURL: "https://stoody-7c7e1.firebaseio.com",
	projectId: "stoody-7c7e1",
	storageBucket: "stoody-7c7e1.appspot.com",
	messagingSenderId: "388094586243"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const settings = { timestampsInSnapshots: true};
const db = firebaseApp.firestore()
db.settings(settings)

//======================SCREEN CONTAINING MAP==========================
class MapScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = { isLoading: true, markers: [] };
	}
	
	componentDidMount() {
		this.timer = setInterval(()=> this.fetchMarkerData(), 3000);
	}
	fetchMarkerData() {
		let temp = [];
		var dataObject = {};
		
		var users = db.collection('users');
		var query = users.get()
		.then(snapshot => {
			snapshot.forEach(doc => {
				var data = doc.data();
				var id = doc.id;
				temp.push(doc.data())
			});
			//console.log(temp);
			this.setState({
				isLoading: false,
				markers: temp
			});
		})

	}
	renderMarkers() {
		return this.state.isLoading ? null : this.state.markers.map((marker, index) => {
			const coords = {
				latitude: marker.g_loc._lat,
				longitude: marker.g_loc._long
			};

			//https://github.com/react-community/react-native-maps/blob/master/docs/marker.md
      return(
				<MapView.Marker
        key={index}
				coordinate={coords}
				title={marker.subject}
				description={marker.description}
				/>
			);
		});
  	}
  render() {
    return (
			<MapView
				style={{
					flex: 9
				}}
				provider = { PROVIDER_GOOGLE }
				initialRegion={{
					latitude: 42.277154,
					longitude: -83.738285, //changed
					latitudeDelta: 0.01,
					longitudeDelta: 0.01,
				}}
			>
				{this.renderMarkers()}
			</MapView>
    );
  }
}


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
	  this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
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

  handleInputChange(event = {}) {
    const name = event.target && event.target.name;
    const value = event.target && event.target.value;

    this.setState([name]: value);
    console.log("-------------this.state-----------");
    console.log(this.state);
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
              numberOfLines={7}
            />
            <TouchableHighlight style={styles.button} onPress={this.handleSubmit} underlayColor='#868c82'>
                <Text style={styles.buttonText}>confirm</Text>
            </TouchableHighlight>
        </View>
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
     }
    }  
    render() {
        return (
            <View style={{ flex: 4, justifyContent: 'center', alignItems: 'center'}}>
                <TextInput style = {styles.addFriendInput}
//                    onChangeText={(text) => this.setusername(text)} //function that should do something with the input?
                    value={this.state.username}
                    placeholder="enter username"
                />
                <TouchableHighlight style={styles.button} onPress={this.handleSubmit} underlayColor='#868c82'>
                  <Text style={styles.buttonText}>add/remove</Text>
                </TouchableHighlight>
                <View style = {{height:100}}
                />
                <Text style = {styles.friendTitle} >
                    friends
                </Text>
                <Text style = {styles.lineStyle} >
                    --------------------------------------------------------
                </Text>
                <Text style = {styles.friendNameStyle} >
                    alexewu
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
			            		 paddingTop: 5}}
			          />
			        ),
		    	},
	  },
	  Friends: {
	  			screen: FriendsScreen,
	  			navigationOptions: {
			        tabBarLabel: 'Friends (to-do)',
			        tabBarIcon: ({ tintColor, focused }) => (
			          <Icon
			            name="ios-thumbs-up"
			            size={24}
			            style={{ color: tintColor,
		            			 paddingTop: 5 }}
			          />
			        ),
		    	},
	  },
	},

);

class HomeScreen extends React.Component {
  render() {
    const {navigate} = this.props.navigation;
    return (
      <Button
        title="Go to Map"
        onPress={() => navigate('Map')}
      />
    );
  }
}

//https://stackoverflow.com/questions/51129444/how-to-hide-header-of-createstacknavigator-on-react-native
const App = createStackNavigator({
  Home: {screen: HomeScreen,
          navigationOptions: {
            header: null 
        }
  },
  Map: {screen: MainNavigator,
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
        //marginBottom: 175,
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



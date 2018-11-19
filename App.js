import React from 'react';
import { Ionicons as Icon } from '@expo/vector-icons';
//import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View, AppRegistry, Button, Platform, TouchableHighlight, TextInput } from "react-native";
import { MapView, Constants, Location, Permissions} from "expo";
import { createBottomTabNavigator } from 'react-navigation'
import * as firebase from 'firebase';
import 'firebase/firestore';
//import Ionicons from 'react-native-vector-icons/Ionicons';

//import t from 'tcomb-form-native';

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
		this.timer = setInterval(()=> this.fetchMarkerData(), 1500);
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
			console.log(temp);
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
      var description = 'Location: ' + marker.spec_loc + ' | Time studying: ' + marker.time_study;
      return(
				<MapView.Marker
				style={{flex: -1, position: 'absolute', width:300}}
        key={index}
				coordinate={coords}
				title={marker.username}
				description={description}
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
//=====================================================================
class FormScreen extends React.Component {
  constructor(props) {
	  super(props);
	  this.state = {
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
    username: sp.name, spec_loc: sp.spec_loc, 
    time_study: sp.time_study, g_loc: new firebase.firestore.GeoPoint(this.state.g_loc.coords.latitude, this.state.g_loc.coords.longitude)});
  }

  stop_stoody = () => {
    var deleteDoc = db.collection('users').doc(this.state.name).delete();
  }

  handleSubmit = () => {
    const value = this._form.getValue(); // use that ref to get the form value
    console.log('value: ', value);
    if(value != null){
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
        subject: "",
        description: "",
        confirmed: true,
        text: "Delete"
        }, this.start_stoody);
      }
    }
  }

  componentWillMount() {
      this._getLocationAsync();
    }
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
                value={this.state.subject}
                placeholder="subject"
            />
            <Text style = {styles.lineStyle} >
                --------------------------------------------------------
            </Text>
            <TextInput style = {styles.descriptionInput}
                value={this.state.description}
                placeholder="enter description(Specific location, time studying, etc)"
            />
            <TouchableHighlight style={styles.button} onPress={this.handleSubmit} underlayColor='#868c82'>
              <Text style={styles.buttonText}>confirm</Text>
            </TouchableHighlight>
          </View>
    );
  }
}

//======================SCREEN CONTAINING FRIENDS==========================
//=====================================================================
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

export default class IconExample extends React.Component {
	render() {
		return (
		<View style={{flex:1}}>
			<MainNavigator style={{flex:1}}/>
		</View>
		);
	}
}

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
        fontSize: 23,
        marginTop: 100,
        marginBottom: 175,
    },
    lineStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        color: '#3b3b3b',
        fontFamily: 'Futura',
        fontSize: 23,
        marginBottom: 10,
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
    container: {
        justifyContent: 'center',
        marginTop: 50,
        padding: 20,
        backgroundColor: '#ffffff',
  	},
    //controls the 'confirm' and 'add/remove' button on form
    button: {
        height: 36,
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



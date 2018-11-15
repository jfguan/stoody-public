import React from 'react';
import { Ionicons as Icon } from '@expo/vector-icons';
//import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View, AppRegistry, Button, Platform, TouchableHighlight} from "react-native";
import { MapView, Constants, Location, Permissions} from "expo";
import { createBottomTabNavigator } from 'react-navigation'
import * as firebase from 'firebase';
import 'firebase/firestore';
//import Ionicons from 'react-native-vector-icons/Ionicons';

import t from 'tcomb-form-native';

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


//=====================STYLING STUFF(WORK IN PROGRESS)=====================
var LABEL_COLOR = "#000000";
var INPUT_COLOR = "#000000";
var ERROR_COLOR = "#a94442";
var HELP_COLOR = "#999999";
var BORDER_COLOR = "#cccccc";
var DISABLED_COLOR = "#777777";
var DISABLED_BACKGROUND_COLOR = "#eeeeee";
var FONT_SIZE = 17;
var FONT_WEIGHT = "500";

var stylesheet = Object.freeze({
  fieldset: {},
  // the style applied to the container of all inputs
  formGroup: {
    normal: {
      marginBottom: 10
    },
    error: {
      marginBottom: 10
    }
  },
  controlLabel: {
    normal: {
      color: LABEL_COLOR,
      fontSize: FONT_SIZE,
      marginBottom: 7,
      fontWeight: FONT_WEIGHT
    },
    // the style applied when a validation error occours
    error: {
      color: ERROR_COLOR,
      fontSize: FONT_SIZE,
      marginBottom: 7,
      fontWeight: FONT_WEIGHT
    }
  },
  helpBlock: {
    normal: {
      color: HELP_COLOR,
      fontSize: FONT_SIZE,
      marginBottom: 2
    },
    // the style applied when a validation error occours
    error: {
      color: HELP_COLOR,
      fontSize: FONT_SIZE,
      marginBottom: 2
    }
  },
  errorBlock: {
    fontSize: FONT_SIZE,
    marginBottom: 2,
    color: ERROR_COLOR
  },
  textboxView: {
    normal: {},
    error: {},
    notEditable: {}
  },
  textbox: {
    normal: {
      fontFamily: "Times New Roman",
      color: INPUT_COLOR,
      fontSize: FONT_SIZE,
      height: 36,
      paddingVertical: Platform.OS === "ios" ? 7 : 0,
      paddingHorizontal: 7,
      borderRadius: 4,
      borderColor: BORDER_COLOR,
      borderWidth: 1,
      marginBottom: 5
    },
    // the style applied when a validation error occours
    error: {
      color: INPUT_COLOR,
      fontSize: FONT_SIZE,
      height: 36,
      paddingVertical: Platform.OS === "ios" ? 7 : 0,
      paddingHorizontal: 7,
      borderRadius: 4,
      borderColor: ERROR_COLOR,
      borderWidth: 1,
      marginBottom: 5
    },
    // the style applied when the textbox is not editable
    notEditable: {
      fontSize: FONT_SIZE,
      height: 36,
      paddingVertical: Platform.OS === "ios" ? 7 : 0,
      paddingHorizontal: 7,
      borderRadius: 4,
      borderColor: BORDER_COLOR,
      borderWidth: 1,
      marginBottom: 5,
      color: DISABLED_COLOR,
      backgroundColor: DISABLED_BACKGROUND_COLOR
    }
  },
  checkbox: {
    normal: {
      marginBottom: 4
    },
    // the style applied when a validation error occours
    error: {
      marginBottom: 4
    }
  },
  pickerContainer: {
    normal: {
      marginBottom: 4,
      borderRadius: 4,
      borderColor: BORDER_COLOR,
      borderWidth: 1
    },
    error: {
      marginBottom: 4,
      borderRadius: 4,
      borderColor: ERROR_COLOR,
      borderWidth: 1
    },
    open: {
      // Alter styles when select container is open
    }
  },
  select: {
    normal: Platform.select({
      android: {
        paddingLeft: 7,
        color: INPUT_COLOR
      },
      ios: {}
    }),
    // the style applied when a validation error occours
    error: Platform.select({
      android: {
        paddingLeft: 7,
        color: ERROR_COLOR
      },
      ios: {}
    })
  },
  pickerTouchable: {
    normal: {
      height: 44,
      flexDirection: "row",
      alignItems: "center"
    },
    error: {
      height: 44,
      flexDirection: "row",
      alignItems: "center"
    },
    active: {
      borderBottomWidth: 1,
      borderColor: BORDER_COLOR
    },
    notEditable: {
      height: 44,
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: DISABLED_BACKGROUND_COLOR
    }
  },
  pickerValue: {
    normal: {
      fontSize: FONT_SIZE,
      paddingLeft: 7
    },
    error: {
      fontSize: FONT_SIZE,
      paddingLeft: 7
    }
  },
  datepicker: {
    normal: {
      marginBottom: 4
    },
    // the style applied when a validation error occours
    error: {
      marginBottom: 4
    }
  },
  dateTouchable: {
    normal: {},
    error: {},
    notEditable: {
      backgroundColor: DISABLED_BACKGROUND_COLOR
    }
  },
  dateValue: {
    normal: {
      color: INPUT_COLOR,
      fontSize: FONT_SIZE,
      padding: 7,
      marginBottom: 5
    },
    error: {
      color: ERROR_COLOR,
      fontSize: FONT_SIZE,
      padding: 7,
      marginBottom: 5
    }
  },
  buttonText: {
    fontSize: 18,
    color: "white",
    alignSelf: "center"
  },
  button: {
    height: 36,
    backgroundColor: "#48BBEC",
    borderColor: "#48BBEC",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: "stretch",
    justifyContent: "center"
  }
});

//====================================================================

const Form = t.form.Form;
t.form.Form.stylesheet = stylesheet;

const User = t.struct({
  Name: t.String,
  Location: t.String,
  Study_Time: t.String,
  //terms: t.Boolean
});


//======================SCREEN CONTAINING MAP==========================
//=====================================================================
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
	  	name: null,
	  	time_study: null,
	  	spec_loc: null,
	    g_loc: null,
	    stoody: true,
	    errorMessage: null,
	    text: "Confirm",
	  };
	  this.handleSubmit = this.handleSubmit.bind(this)
  }

  start_stoody = () => {
  	this._getLocationAsync();
  	var users = db.collection('users');
  	var sp = this.state;// stateproxy var to shorten
  	console.log("sp");
  	console.log(sp);
  	var new_user = users.doc(sp.name).set({
    username: sp.name, spec_loc: sp.spec_loc, 
    time_study: sp.time_study, g_loc: new firebase.firestore.GeoPoint(sp.g_loc.coords.latitude, sp.g_loc.coords.longitude)});
  }

//  delete_stoody = () => {
//
//  }
  stop_stoody = () => {
    var deleteDoc = db.collection('users').doc(this.state.name).delete();
  }

  handleSubmit = () => {
    const value = this._form.getValue(); // use that ref to get the form value
    console.log('value: ', value);
    if(value != null){
      if(this.state.stoody){
      	this.setState({
      		...this.state,
  			name: value.Name,
  			spec_loc: value.Location,
  			time_study: value.Study_Time,
  			stoody: false,
  			text: "Delete"
  		  }, this.start_stoody);
      }
      else{
      	this.setState({
      		...this.state,
  			stoody : true,
  			text: "Confirm"
  		  }, this.stop_stoody);
      }
    }
  }
  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
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
      <View style={styles.container}>
        <Form 
          ref={c => this._form = c} // assign a ref
          type={User} 
        />
        <TouchableHighlight style={styles.button} onPress={this.handleSubmit} underlayColor='#cc6899'>
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

//======================SCREEN CONTAINING FRIENDS==========================
//=====================================================================
class FriendsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 4, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={styles.mainFont}>wow friends wow so fun much procrastinate :)</Text>
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
	{

	}

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
        color: 'lightgray',
        fontSize: 15,
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
    //controls the 'confirm' button on form
    button: {
        height: 36,
        backgroundColor: '#ddaad8',
//        borderColor: '#ddaad8',
//        borderWidth: 1,
        borderRadius: 17,
        marginBottom: 10,
        alignSelf: 'stretch',
        justifyContent: 'center'
    },
    buttonText: {
        fontFamily: 'Futura',
        fontSize: 18,
        color: 'white',
        alignSelf: 'center'
    },
});



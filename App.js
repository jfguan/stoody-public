import React from 'react';
//import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View, AppRegistry } from "react-native";
import { MapView } from "expo";
import { createBottomTabNavigator } from 'react-navigation'
import * as firebase from 'firebase';
import 'firebase/firestore';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Initialize Firebase
const firebaseConfig = {
	apiKey: "AIzaSyDnnSaCl_BCymYXC6T7GFx5hgGRioa2djg",
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

class MapScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = { isLoading: true, markers: [] };
	}
	
	componentDidMount() {
		this.fetchMarkerData();
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
			// var jsonData = JSON.stringify(dataObject)
			// console.log("jsonData")
			// console.log(jsonData)
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

			return(
				<MapView.Marker
				key={index}
				coordinate={coords}
				title={marker.username}
				description={marker.spec_loc}
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
					longitude: -83.738285,
			</MapView>
    );
  }
}

class SettingsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Settings!</Text>
      </View>
    );
  }
}

class TimerScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={styles.bigblue}>Timer!</Text>
      </View>
    );
  }
}

const MainNavigator = createBottomTabNavigator({
  Map: { screen: MapScreen },
  Settings: { screen: SettingsScreen },
  Timer: {screen: TimerScreen}
});

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
    bigblue: {
      color: 'blue',
      fontWeight: 'bold',
      fontSize: 15,
    },

});
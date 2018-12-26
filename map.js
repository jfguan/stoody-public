import React, { Component } from 'react';
import { Ionicons as Icon } from '@expo/vector-icons';
import { StyleSheet, Text, View, AppRegistry, Button, Platform, TouchableHighlight, TextInput, ScrollView, TouchableWithoutFeedback, Keyboard } from "react-native";
import { Constants, Location, Permissions} from "expo";
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import * as firebase from 'firebase';
import 'firebase/firestore';


//======================SCREEN CONTAINING MAP==========================
class MapScreen extends React.Component {
	
  constructor(props) {
		super(props);
		this.state = { isLoading: true, markers: [] };
	}
	
    //fetch marker data every 3 seconds
	componentDidMount() {
		this.timer = setInterval(()=> this.fetchMarkerData(), 3000);
	}
    
    //pushes data into temp array and in .setState() sets markers as temp
    //TO-DO: figure out way to retreive autheticated user's data
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
			this.setState({
				isLoading: false,
				markers: temp
			});
		})

	}

    //places markers on map
	renderMarkers() {
        //loops through markers array and adds each marker to the map
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

    //renders a map and places markers on map component
    render() {
        return (
            <MapView
                style={{
                    flex: 9
                }}
                provider = { PROVIDER_GOOGLE }
                initialRegion={{
                    latitude: 42.277154,
                    longitude: -83.738285,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                }}
            >
            {this.renderMarkers()}
            </MapView>
        );
    }
}


import React, { Component } from 'react';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import 'firebase/firestore';
import firebaseApp from './Config/FirebaseConfig';

const settings = { timestampsInSnapshots: true};
const db = firebaseApp.firestore();
db.settings(settings);
//======================SCREEN CONTAINING MAP==========================
export default class MapScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            markers: [],
            currentUser: null,
        };
    }

    componentDidMount() {
        // Set current user
        const { currentUser } = firebaseApp.auth()
        this.setState({
            ...this.state,
            currentUser: currentUser,
        }, this.fetchMarkerData);
        // Set fetch marker data to run every 5 seconds
        this.timer = setInterval(()=> this.fetchMarkerData(), 5000);
    }

    // Pushes data into temporary locData array and in .setState() sets markers 
    fetchMarkerData() {
        const { currentUser } = this.state;

        // Go through user's 'friends' collections and for each friend add their data to locaData
        // locPromises is used to force setstate after async document call ends
        let locData = [];
        const locPromises = [];
        db.collection('users').doc(currentUser.email).collection('friends').get().then( snapshot => {
            snapshot.forEach(friend => {
                const request = db.collection('users').doc(friend.id).get().then(friendDoc => {
                    locData.push(friendDoc.data());
                });
                locPromises.push(request);
            });
            return Promise.all(locPromises);
        }).then(() => {
            this.setState({
                isLoading: false,
                markers: locData
            });
        });
    }

    renderMarkers() {
        // Loops through marker array, creating a new marker object for each entry in the array
        return this.state.isLoading ? null : this.state.markers.map((marker, index) => {
            //Constrcut coord obj for use in return statement
            const coords = {
                latitude: marker.g_loc._lat,
                longitude: marker.g_loc._long
            };

            //https://github.com/react-community/react-native-maps/blob/master/docs/marker.md
            return(
                <MapView.Marker
                    key={index}
                    coordinate={coords}
                    title={marker.username + ' | ' + marker.subject}
                    description={marker.description}
                />
            );
        });
    }

    //Renders a map and places markers on map component
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


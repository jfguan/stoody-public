import React, { Component } from 'react';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import 'firebase/firestore';

// Initialize Firebase
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

    
    //fetch marker data every 3 seconds
    componentDidMount() {
        const { currentUser } = firebaseApp.auth()
        this.setState({ 
            ...this.state,
            currentUser: currentUser,
        }, this.fetchMarkerData);
        this.timer = setInterval(()=> this.fetchMarkerData(), 5000);
    }

    //pushes data into temp array and in .setState() sets markers as temp
    //TO-DO: figure out way to retreive autheticated user's data
    fetchMarkerData() {
        const { currentUser } = this.state;
        
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
                    title={marker.username + ' | ' + marker.subject}
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


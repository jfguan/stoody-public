import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    TouchableOpacity,
    ListView,
    TextInput,
    Dimensions,
    TouchableWithoutFeedback,
    Keyboard,
    ImageBackground,
} from 'react-native';
import 'firebase/firestore';
import firebaseApp from './Config/FirebaseConfig';

const settings = { timestampsInSnapshots: true };
const db = firebaseApp.firestore();
db.settings(settings);

export default class FriendsScreen extends React.Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            addUserByEmail: "",
            currentUser: null,
            addFriend: "",
            dataSource: ds.cloneWithRows([
                {image: "https://img.icons8.com/ios/50/000000/crow.png", username:"Loading"},
            ]),
        };
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    // Retrieves and sets currentUser state
    componentDidMount() {
        const { currentUser } = firebaseApp.auth()
        this.setState({ 
            ...this.state,
            currentUser: currentUser,
        }, this.getFriendsList);
        this.timer = setInterval(()=> this.getFriendsList(), 3000);
    }

    // Triggered by add friend button
    handleSubmit = () => {
        // Empty string check
        if(!this.state.addUserByEmail){
            return false;
        }
        // Check if friend adding exists
        db.collection('users').doc(this.state.addUserByEmail).get().then((docSnapshot) => {
            if (docSnapshot.exists) {
                const { currentUser } = this.state;
                // Look for if 'other user' friendReq'd 'user'
                const usersRef = db.collection('users');
                usersRef.doc(currentUser.email).collection('friends').doc(currentUser.email).set({});
                friendReq = usersRef.doc(this.state.addUserByEmail).collection('friendReqs').doc(currentUser.email);
                friendReq.get().then((docSnapshot) => {
                      // If friendReq existed, move both users from 'friendReqs' to 'friends' collections
                      if (docSnapshot.exists) {
                        // Add friendship to both users
                        usersRef.doc(this.state.addUserByEmail).collection('friends').doc(currentUser.email).set({});
                        usersRef.doc(currentUser.email).collection('friends').doc(this.state.addUserByEmail).set({});
                        // Remove friend request
                        usersRef.doc(this.state.addUserByEmail).collection('friendReqs').doc(currentUser.email).delete();
                      }
                      // Else add 'other user' to friendReq collection.
                      else {
                        usersRef.doc(currentUser.email).collection('friendReqs').doc(this.state.addUserByEmail).set({});
                      }
                });
                console.log(this.state.addUserByEmail);

                this.setState({
                    ...this.state,
                    addUserByEmail: "Friend request sent!"
                })
            } 
            else {
                this.setState({
                    ...this.state,
                    addUserByEmail: "Friendo no existo :("
                })
              return false;
            }
        });
    }

    getFriendsList(){
      const { currentUser } = this.state;
      const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      let friendsArr = [];
      const friendsPromises =[];

      db.collection('users').doc(currentUser.email).collection('friends').get().then( snapshot => {
          snapshot.forEach(friend => {
              const request = db.collection('users').doc(friend.id).get().then(friendDoc => {
                  friendsArr.push(
                    {
                      image: "https://image.flaticon.com/icons/svg/1451/1451296.svg", 
                      username: friendDoc.get("username"),
                      stoodying: friendDoc.get("stoodying"),
                    },
                  );
              });
              friendsPromises.push(request);
          });
          return Promise.all(friendsPromises);
      }).then(() => {
          this.setState({ 
            ...this.state,
            dataSource: ds.cloneWithRows(friendsArr),
          });
      });

    }

    render() {
        const { currentUser } = this.state
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <ImageBackground style={{flex: 1, alignItems: 'center'}} source= {require('./assets/background.png')}>
                    <View style={styles.container}>

                        <View style={styles.header}>
                            <Image style={styles.avatar} source={require('./assets/dog.png')}/>
                            <Text style={styles.name}>{currentUser && currentUser.email} </Text>
                        </View>
                        
                        <View style={styles.body}>
                            <TouchableOpacity onPress={this.handleSubmit}>
                                <View style={styles.box}>
                                    <Image style={styles.image} source={{uri: 'https://cdn4.iconfinder.com/data/icons/evil-icons-user-interface/64/plus-512.png'}}/>
                                    <TextInput 
                                        style={styles.addFriendInput}
                                        value = {this.state.addUserByEmail}
                                        onChangeText={(addUserByEmail) => this.setState({addUserByEmail})}
                                        placeholder='add friend'
                                        returnKeyType='done'
                                        autoCapitalize="none"
                                        placeholderStyle={{ fontFamily: 'Futura' }}
                                    />
                                </View>
                            </TouchableOpacity>
                            <ListView enableEmptySections={true}
                                dataSource={this.state.dataSource}
                                renderRow={(user) => {
                                    return (
                                        <TouchableOpacity>
                                            <View style={styles.box}>
                                                <Image style={styles.image} source={require('./assets/doggo.png')}/>
                                                <Text style={styles.username}>{user.username}</Text>
                                                <View style={styles.rightContainer}>
                                                    <Text style={styles.status}>{user.stoodying}</Text>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                }}
                            />
                        </View>
                    </View>
                </ImageBackground>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    header:{
        marginTop: 60,
        padding:20,
        width: Dimensions.get('window').width - 90,
        alignItems: 'center',
    },
    avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "#FFFFFF",
        marginBottom:10,
        resizeMode: 'contain',
    },
    image:{
        marginRight: 10,
        width: 60,
        height: 60,
        borderRadius: 30,
        borderColor: 'black',
    },
    name:{
        fontSize:22,
        fontFamily: 'Futura',
        color:"#FFFFFF",
        fontWeight:'600',
    },
    body: {
        marginTop: 20,
        padding:25,
        backgroundColor: 'rgba(255,255,255,0.7)',
        borderRadius: 35,
        height: 350,
    },
    box: {
        padding:2,
        marginTop:5,
        marginBottom:5,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        shadowColor: 'black',
        alignItems: 'center',
        shadowOpacity: .2,
        shadowOffset: {
            height:1,
            width:-2
        },
        elevation:2,
        borderRadius: 35,
    },
    username: {
        color: "#5D93D3",
        fontFamily: 'Futura',
        fontSize:15,
        alignSelf:'center',
        marginLeft:10
    },
    rightContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    status: {
        color: "#d5dce8",
        fontFamily: 'Futura',
        fontSize: 12,
        flexDirection: 'row',
        marginRight: 5,
    },
    addFriendInput: { //friends,
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Futura',
        fontSize: 15,
        height: 44,
        width: 150,
        borderColor: 'gray',
        borderWidth: 0,
        borderRadius: 24,
    },
});
 
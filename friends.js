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

    //retrieves and sets currentUser state
    componentDidMount() {
      const { currentUser } = firebaseApp.auth()
      this.setState({ 
        ...this.state,
        currentUser: currentUser,
      }, this.getFriendsList);
      this.timer = setInterval(()=> this.getFriendsList(), 3000);
    }

    handleSubmit = () => {
      //If user input a string
      if(this.state.addUserByEmail){
        const { currentUser } = this.state;
        //Look for if 'other user' friendReq'd 'user'
        const usersRef = db.collection('users');
        friendReq = usersRef.doc(this.state.addUserByEmail).collection('friendReqs').doc(currentUser.email);
        friendReq.get()
          .then((docSnapshot) => {
              //If friendReq existed, move both users from 'friendReqs' to 'friends' collections
              if (docSnapshot.exists) {
                //Add friendship to both users
                usersRef.doc(this.state.addUserByEmail).collection('friends').doc(currentUser.email).set({});
                usersRef.doc(currentUser.email).collection('friends').doc(this.state.addUserByEmail).set({});
                //Remove friend request
                usersRef.doc(this.state.addUserByEmail).collection('friendReqs').doc(currentUser.email).delete();
              }
              //Else add 'other user' to friendReq collection.
              else {
                usersRef.doc(currentUser.email).collection('friendReqs').doc(this.state.addUserByEmail).set({});
              }
        });
        console.log(this.state.addUserByEmail);
      } 
    }

    getFriendsList(){
      const { currentUser } = this.state;
      const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      let friendsArr = [];

      var friendsRef = db.collection('users').doc(currentUser.email).collection('friends');
      var query = friendsRef.get()
      .then(snapshot => {
          snapshot.forEach(doc => {
              console.log(doc.id);
              friendsArr.push(
                {image: "https://img.icons8.com/ios/50/000000/crow.png", username: doc.id},
              )
          });
          console.log(friendsArr);
          this.setState({ 
            ...this.state,
            dataSource: ds.cloneWithRows(friendsArr)
          })
      })
      console.log(friendsArr);

    }

    render() {
        const { currentUser } = this.state
        return (
          <View style={styles.container}>
              <View style={{width: Dimensions.get('window').width, height: 50, backgroundColor: '#408e6c'}}/>

              <View style={styles.header}>
                  <View style={styles.headerContent}>
                      <Image style={styles.avatar} source={{uri: 'https://img.icons8.com/color/300/000000/user-female-circle.png'}}/>
                      <Text style={styles.name}>{currentUser && currentUser.email} </Text>
                  </View>
              </View>
              
              <View style={styles.body}>
                  //text input to add friends
                  <TouchableOpacity onPress={this.handleSubmit}>
                      <View style={styles.box}>
                          <Image style={styles.image} source={{uri: 'https://cdn4.iconfinder.com/data/icons/evil-icons-user-interface/64/plus-512.png'}}/>
                          <TextInput 
                              style={styles.addFriend}
                              onChangeText={(addUserByEmail) => this.setState({addUserByEmail})}
                              placeholder='add friend'
                              returnKeyType='done'
                          />
                      </View>
                  </TouchableOpacity>
                  <ListView style={styles.container} enableEmptySections={true}
                      dataSource={this.state.dataSource}
                      renderRow={(user) => {
                          return (
                            <TouchableOpacity>
                              <View style={styles.box}>
                                  <Image style={styles.image} source={{uri: user.image}}/>
                                  <Text style={styles.username}>{user.username}</Text>
                                  <View style={styles.rightContainer}>
                                      <Text style={styles.status}>inactive</Text>
                                  </View>
                              </View>
                            </TouchableOpacity>
                          )
                      }}
                  />
              </View>

          </View>
        );
    }
}

const styles = StyleSheet.create({
    header:{
        backgroundColor: "#408e6c",
    },
    headerContent:{
        padding:20,
        alignItems: 'center',
    },
    addFriend: {
        fontFamily: 'Futura',
        color:"#c4c4c4",
        fontSize:15,
        alignSelf:'center',
        marginLeft:10
    },
    avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "#FFFFFF",
        marginBottom:10,
    },
    image:{
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
        padding:30,
        backgroundColor :"#E6E6FA",
    },
    box: {
        padding:5,
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
        elevation:2
    },
    username: {
        color: "#20B2AA",
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
    }
});
 
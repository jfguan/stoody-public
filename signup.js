// SignUp.js
import React from 'react';
import { StyleSheet, Text, TextInput, View, Button, TouchableHighlight, ImageBackground } from 'react-native';
import * as firebase from 'firebase';
import firebaseApp from './Config/FirebaseConfig';

const settings = { timestampsInSnapshots: true };
const db = firebaseApp.firestore();
db.settings(settings);
// Registration screen
export default class SignUp extends React.Component {
  state = { 
    username: '',
    email: '', 
    password: '',
    confirm_pass: '',
    errorMessage: null 
  }

handleSignUp = () => {
  if(this.state.password == this.state.confirm_pass){
    console.log('Creating user?');
    
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(
        () => this.props.navigation.navigate('MainNav'),
        db.collection('users').doc(this.state.email).set({
          username: this.state.username,
          subject: '', 
          description: '', 
          g_loc: new firebase.firestore.GeoPoint(-90, 0),
          stoodying: false,
        }),
      )
      .catch(error => this.setState({ errorMessage: error.message }))
  }
  else{
    this.setState({ 
      ...this.state, 
      errorMessage: 'bruh ur Passwords don\'t match'});
  }
  console.log('handleSignUp');
}

render() {
    return (
      <ImageBackground style={{flex: 1, alignItems: 'center'}} source= {require('./assets/background.png')}>
      <View style={styles.container}>
        <Text style={styles.loginAndSignUp}> B A L D </Text>
        {this.state.errorMessage &&
          <Text style={styles.errorMsgStyle}>
            {this.state.errorMessage}
          </Text>}
        <TextInput
          placeholder='✉ Username'
          placeholderTextColor= '#2567C5'
          autoCapitalize='none'
          style={styles.textInput}
          onChangeText={username => this.setState({ username })}
          value={this.state.username}
        />
        <TextInput
          placeholder='✉ Email'
          placeholderTextColor= '#2567C5'
          autoCapitalize='none'
          style={styles.textInput}
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          placeholder='🔒 Password'
          placeholderTextColor= '#2567C5'
          autoCapitalize='none'
          style={styles.textInput}
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <TextInput
          secureTextEntry
          placeholder='🔒 Confirm Password'
          placeholderTextColor= '#2567C5'
          autoCapitalize='none'
          style={styles.textInput}
          onChangeText={confirm_pass => this.setState({ confirm_pass })}
          value={this.state.confirm_pass}
        />
        <TouchableHighlight style={styles.otherButton} underlayColor='#868c82' onPress={this.handleSignUp}>
            <Text style={styles.buttonText}> Sign Up </Text>
        </TouchableHighlight>
        <Button
          textStyle={{ fontFamily: 'Futura' }}
          color='#4c93C8'
          title='Already have an account? Login'
          onPress={() => this.props.navigation.navigate('Login')}
        />
      </View>
      </ImageBackground>
    )
  }
}

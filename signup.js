// SignUp.js
import React from 'react'
import { StyleSheet, Text, TextInput, View, Button, TouchableHighlight } from 'react-native'

import 'firebase/firestore';
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
    db.collection('users').doc(this.state.email).set({ username: this.state.username });
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => this.props.navigation.navigate('MainNav'))
      .catch(error => this.setState({ errorMessage: error.message }))
  }
  else{
    this.setState({ errorMessage: 'bruh ur Passwords don\'t match'});
  }
  console.log('handleSignUp');
}

render() {
    return (
      <View style={styles.container}>
        <Text style={styles.loginAndSignUp}> join the bald ppl 👽 </Text>
        {this.state.errorMessage &&
          <Text style={styles.errorMsgStyle}>
            {this.state.errorMessage}
          </Text>}
        <TextInput
          placeholder='Username'
          autoCapitalize='none'
          style={styles.textInput}
          onChangeText={username => this.setState({ username })}
          value={this.state.username}
        />
        <TextInput
          placeholder='✉ Email'
          autoCapitalize='none'
          style={styles.textInput}
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          placeholder='🔒 Password'
          autoCapitalize='none'
          style={styles.textInput}
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <TextInput
          secureTextEntry
          placeholder='🔒 Confirm Password'
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
          color='gray'
          title='Already have an account? Login'
          onPress={() => this.props.navigation.navigate('Login')}
        />
      </View>
    )
  }
}

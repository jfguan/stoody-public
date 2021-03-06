// Login.js
import React from 'react'
import { StyleSheet, Text, TextInput, View, Button, TouchableHighlight, ImageBackground } from 'react-native'
import * as firebase from 'firebase';

export default class Login extends React.Component {
  state = { 
    email: '', 
    password: '', 
    errorMessage: null 
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.props.navigation.navigate(user ? 'MainNav' : 'Login')
    })
  }
  
  handleLogin = () => {
    const { email, pasword } = this.state
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => this.props.navigation.navigate('MainNav'))
      .catch(error => this.setState({ errorMessage: error.message }))
  }

  render() {
    return (
      <ImageBackground style={{flex: 1, alignItems: 'center'}} source= {require('./assets/background.png')}>
        <View style={styles.container}>
          <Text style={styles.loginAndSignUp}>STOODY</Text>
          {this.state.errorMessage &&
            <Text style={styles.errorMsgStyle}>
              {this.state.errorMessage}
            </Text>}
          <TextInput
            style={styles.textInput}
            autoCapitalize="none"
            placeholder="✉ Email"
            placeholderTextColor= '#2567C5'
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
          />
          <TextInput
            secureTextEntry
            style={styles.textInput}
            autoCapitalize="none"
            placeholder="🔒 Password"
            placeholderTextColor= '#2567C5'
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
          />
          <TouchableHighlight style={styles.otherButton} onPress={this.handleLogin}>
              <Text style={styles.buttonText}> Login </Text>
          </TouchableHighlight>
          <Button
            textStyle={{ fontFamily: 'Futura' }}
            color='#4c93C8'
            title="Create an account"
            onPress={() => this.props.navigation.navigate('SignUp')}
          />
        </View>
      </ImageBackground>
    )
  }
}

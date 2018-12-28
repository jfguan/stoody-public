// SignUp.js
import React from 'react'
import { StyleSheet, Text, TextInput, View, Button, TouchableHighlight } from 'react-native'
import * as firebase from 'firebase';

// Registration screen
export default class SignUp extends React.Component {
  state = { 
    email: '', 
    password: '', 
    errorMessage: null 
  }

handleSignUp = () => {
  firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => this.props.navigation.navigate('MainNav'))
      .catch(error => this.setState({ errorMessage: error.message }))
  console.log('handleSignUp')
}

render() {
    return (
      <View style={styles.container}>
        <Text style={styles.loginAndSignUp}> join the bald ppl 👽 </Text>
        {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}
        <TextInput
          placeholder="✉ Email"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          placeholder="🔒 Password"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <TextInput
          secureTextEntry
          placeholder="🔒 Confirm Password"
          autoCapitalize="none"
          style={styles.textInput}
          //onChangeText={password => this.setState({ password })}
          //value={this.state.password}
        />
        <TouchableHighlight style={styles.otherButton} underlayColor='#868c82' onPress={this.handleSignUp}>
            <Text style={styles.buttonText}> Sign Up </Text>
        </TouchableHighlight>
        <Button
          textStyle={{ fontFamily: 'Futura' }}
          color="gray"
          title="Already have an account? Login"
          onPress={() => this.props.navigation.navigate('Login')}
        />
      </View>
    )
  }
}

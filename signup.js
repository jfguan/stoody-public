// SignUp.js
import React from 'react'
import { StyleSheet, Text, TextInput, View, Button } from 'react-native'
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
        <Text style={styles.mainFont}>Create an account</Text>
        {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}
        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          placeholder="Password"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <Button 
          title="Sign Up" onPress={this.handleSignUp} 
          style={styles.button}
        />
        <Button
          title="Already have an account? Login"
          onPress={() => this.props.navigation.navigate('Login')}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInput: {
    fontFamily: 'Futura',
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 8
  },
  mainFont: {
    fontFamily: 'Futura',
    color: '#3b3b3b',
    fontSize: 15,
    alignItems: 'center',
    textAlign: 'center',
  },
  button: {
    fontFamily: 'Futura',
  },
})
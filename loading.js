import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet , ImageBackground } from 'react-native'
import * as firebase from 'firebase';


function sleepFor( sleepDuration ){
    var now = new Date().getTime();
    while(new Date().getTime() < now + sleepDuration){ /* do nothing */ } 
} 

export default class Loading extends React.Component { 
componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      sleepFor(1500);
      this.props.navigation.navigate(user ? 'MainNav' : 'Login')
    })
  }

  render() {
    return (
        <ImageBackground source={require('./splash.jpg')}
                        style={styles.container}>
            <Text>AHHhHHHHHHH</Text>
        </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})
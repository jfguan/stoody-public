# Stoody! Unproductively study with friends

Find your friends nearby! The main study areas, namely the ugli, hatcher, and fishbowl are all relatively close to each other and many times people might pass each other unknowingly when they might have hungout otherwise. Sort of like my find my friends or snapmaps, but meant to imply invitation: if you see me on the map, you're more than welcome to stop by or study with me!

### Features (checkout our video demo!):

[![ALt text](https://img.youtube.com/vi/nyARdwBz7yE/0.jpg)](https://www.youtube.com/watch?v=nyARdwBz7yE)


* Login/register system
* Friend system(adding friends)
* Place yourself on the map!
* See your friends on the MAP


### Prerequisites

* Don't use Eric's computer doesn't install expo for some reason
* Expo iPhone app or iOS simulator
* Node.js npm
* Git

## Dependencies

* React Native- The JS framework used
* Firebase - Backing data layer
* Expo - Dependency Management

## Installation
0. Install dependencies
```
npm install -g expo-cli
npm install --save firebase
npm install react-native
```
1. Download code
```
git clone https://github.com/jfguan/stoody.git
cd stoody
```
2. Create Firebase firestore and fill out firebase config in Config/FirebaseConfig.js
3. Enable authenticaion in firebase

```
const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: ""
};

```
## Getting Started

1. $ expo start
2. Scan barcode with iPhone camera app or type i to open iOS simulator

## Running the tests

Haha what are tests

## Authors

Terribly programmed by:  
Jeff Guan  
Alex Wu  
Eric Chen  
Ameya Gadkari 

Designed by:  
Michelle Scarlett


## Versioning

We don't really track previous versions, every build is final


## Acknowledgments/Credits

* That one dude from Mhacks who basically taught me about how to call after async, I still don't really understand though

* <div>Icons made by <a href="https://www.freepik.com/" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/"              title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/"              title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
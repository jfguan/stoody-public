import React, {StyleSheet} from 'react-native'


export default styles = StyleSheet.create({
    addFriendInput: { //friends,
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Futura',
        fontSize: 23,
        marginBottom: 8,
        marginTop: -4,
        borderColor: 'gray',
        borderWidth: 0,
        borderRadius: 24,
    },
    usernameInput: { //form
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Futura',
        fontSize: 31,
        marginBottom: -8,
    },
    friendTitle: { //friends,
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Futura',
        fontSize: 28,
        marginBottom: -14,
        letterSpacing: 4,
        fontWeight: 'bold',
    },
    descriptionInput: { //form
        justifyContent: 'center',
        alignItems: 'center',
        color: '#5d6777',
        fontFamily: 'Futura',
        marginTop: 80,
        marginBottom: 175,
        fontSize: 23,
        maxHeight: 275,
        textAlign: 'center',
        width: 320,
    },
    lineStyle: { //friends, form
        justifyContent: 'center',
        alignItems: 'center',
        color: '#3b3b3b',
        fontFamily: 'Futura',
        fontSize: 23,
        marginBottom: 0,
    },
    friendNameStyle: { //friends,
//        fontWeight: 'bold',
        color: '#85c667',
        fontFamily: 'Futura',
        fontSize: 23,
        marginBottom: 20,
        letterSpacing: 3,
    },
    navBar: {
		color: 'green',
    	flex: 1,
    	flexDirection: 'row',
    	alignItems: 'center',
    	backgroundColor: 'red',
    	justifyContent: 'center',
    	tintColor: 'red',
    },
    scrollContainer: { //form
        //justifyContent: 'center',
        //padding: 20,
  	},
    //controls the 'confirm' and 'add/remove' button on form
    button: { //friends, form
        backgroundColor: '#3b3b3b',
        borderRadius: 24,
        marginBottom: 70,
        alignSelf: 'center',
        justifyContent: 'center',
        width: 250,
        height: 42,
    },
    buttonText: { //friends, form
        fontFamily: 'Futura',
        fontSize: 18,
        color: 'white',
        alignSelf: 'center'
    },
});
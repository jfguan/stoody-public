import React, {StyleSheet} from 'react-native'

export default styles = StyleSheet.create({
    //General styling
    lineStyle: { //friends, form
        justifyContent: 'center',
        alignItems: 'center',
        color: '#3b3b3b',
        fontFamily: 'Futura',
        fontSize: 23,
        marginBottom: 0,
    },
    button: { //friends, form
        backgroundColor: '#3b3b3b',
        borderRadius: 24,
        marginBottom: 70,
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: 30,
        width: 250,
        height: 42,
    },
    buttonText: { //friends, form
        fontFamily: 'Futura',
        fontSize: 18,
        color: 'white',
        alignSelf: 'center'
    },

    //Form Screen styling
    usernameInput: { //form
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Futura',
        fontSize: 31,
        marginBottom: -8,
    },
    titleInput: { //form
        fontFamily: 'Futura',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        fontSize: 31,
        borderBottomColor: 'black',
        borderBottomWidth: 3,
        width: 300,
    },
    descriptionInput: {
        fontFamily: 'Futura',
        textAlign: 'center',
        flex:9,
        fontSize: 20,
        width: 300,
        backgroundColor: 'white',
        borderRadius: 30,
        padding: 15,
        paddingTop: 20,
    },
    
    scrollContainer: { //form
        //justifyContent: 'center',
        //padding: 20,
    },
    //controls the 'confirm' and 'add/remove' button on form

    //Friends screen styling
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
    friendTitle: { //friends,
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Futura',
        fontSize: 28,
        marginBottom: -14,
        letterSpacing: 4,
        fontWeight: 'bold',
    },
    friendNameStyle: { //friends,
        color: '#85c667',
        fontFamily: 'Futura',
        fontSize: 23,
        marginBottom: 20,
        letterSpacing: 3,
    },
    
    //Login and Sign Up Styling
    errorMsgStyle: { //friends, form
        color: '#3b3b3b',
        fontFamily: 'Futura',
        fontSize: 12,
    },
    textInput: {
        fontFamily: 'Futura',
        fontSize: 15,
        height: 40,
        width: '85%',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 24,
        marginTop: 8,
        paddingLeft: 16,
    },
    loginAndSignUp: {
        fontFamily: 'Futura',
        color: '#3b3b3b',
        fontSize: 30,
        alignItems: 'center',
        paddingBottom: 15,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    otherButton: {
        backgroundColor: '#3b3b3b',
        borderRadius: 24,
        alignSelf: 'center',
        justifyContent: 'center',
        width: 200,
        height: 42,
        padding: 6,
        marginTop: 14,
    },
});
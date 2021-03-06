import React, {StyleSheet} from 'react-native'

export default styles = StyleSheet.create({
    //General styling
    button: { //friends, form
        backgroundColor: '#2567C5',
        borderRadius: 24,
        marginBottom: 70,
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: 30,
        width: 280,
        height: 42,
    },
    buttonText: { //friends, form
        fontFamily: 'Futura',
        fontSize: 18,
        color: 'white',
        alignSelf: 'center'
    },

    //Form Screen styling
    usernameInput: {
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Futura',
        fontSize: 31,
        marginBottom: -8,
    },
    subjectInput: {
        fontFamily: 'Futura',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#2567C5',
        textAlign: 'center',
        fontSize: 31,
        borderBottomColor: '#2567C5',
        borderBottomWidth: 3,
        width: 300,
    },
    descriptionInput: {
        fontFamily: 'Futura',
        textAlign: 'center',
        color: '#2567C5',
        flex:9,
        fontSize: 20,
        width: 300,
        backgroundColor: 'rgba(255,255,255,0.7)',
        borderRadius: 30,
        padding: 40,
        paddingTop: 30,
    },
    
    //Friends screen styling
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
        width: '75%',
        borderColor: '#5D93D3',
        borderBottomWidth: 1,
        marginTop: 8,
        paddingLeft: 16,
    },
    loginAndSignUp: {
        fontFamily: 'Futura',
        color: '#3b3b3b',
        fontSize: 48,
        alignItems: 'center',
        paddingBottom: 15,
    },
    container: {
        flex: 1,
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    otherButton: {
        backgroundColor: '#2567C5',
        borderRadius: 24,
        alignSelf: 'center',
        justifyContent: 'center',
        width: 200,
        height: 42,
        padding: 6,
        marginTop: 32,
    },
});
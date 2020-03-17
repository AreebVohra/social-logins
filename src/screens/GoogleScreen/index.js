import React, { Component } from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'

import { GoogleSignin, GoogleSigninButton, statusCodes, } from '@react-native-community/google-signin';
import { googleSignInConfig } from '../../utils/config';

import { firebase } from '@react-native-firebase/auth';

export default class GoogleScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: null,
            loggedIn: false,
            isSigninInProgress: false
        };
    }

    signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            this.setState({ userInfo: userInfo, loggedIn: true, isSigninInProgress: true });
            AsyncStorage.setItem('loggedIn', 'true')
            const credential = firebase.auth.GoogleAuthProvider.credential(userInfo.idToken, userInfo.accessToken)
            await firebase.auth().signInWithCredential(credential);

        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                alert(error);
            } else if (error.code === statusCodes.IN_PROGRESS) {
                alert(error)
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                alert(error)
            } else {
                alert(error)
            }
        }
    };

    signOut = async () => {
        try {
            await GoogleSignin.signOut();
            this.setState({ loggedIn: false, isSigninInProgress: false });
            await AsyncStorage.removeItem('loggedIn')
            await GoogleSignin.revokeAccess();
        } catch (error) {
            alert(error)
        }
    };

    componentDidMount = async () => {
        await googleSignInConfig();
        const value = await AsyncStorage.getItem('loggedIn')
        if (value == 'true') {
            this.setState({ loggedIn: true, isSigninInProgress: true })
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <GoogleSigninButton
                    style={{ width: 192, height: 48 }}
                    size={GoogleSigninButton.Size.Wide}
                    color={GoogleSigninButton.Color.Dark}
                    onPress={this.signIn}
                    disabled={this.state.isSigninInProgress}
                />
                <View style={styles.buttonContainer}>
                    {!this.state.loggedIn && <Text>You are currently logged out</Text>}
                    {this.state.loggedIn && <Button onPress={this.signOut}
                        title="Signout"
                        color="#841584">
                    </Button>}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
        flexDirection: 'row',
        justifyContent: 'center'
    },
})
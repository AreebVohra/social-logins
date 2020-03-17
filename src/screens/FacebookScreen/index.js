import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

import { AccessToken, LoginButton } from 'react-native-fbsdk';
import { firebase } from '@react-native-firebase/auth';

export default class FacebookScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <LoginButton
                    onLoginFinished={
                        (error, result) => {
                            if (error) {
                                console.log("login has error: " + result.error);
                            } else if (result.isCancelled) {
                                console.log("login is cancelled.");
                            } else {
                                AccessToken.getCurrentAccessToken().then(
                                    async (data) => {
                                        const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
                                        await firebase.auth().signInWithCredential(credential);
                                    }
                                )
                            }
                        }
                    }
                    onLogoutFinished={() => console.log("logout")} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
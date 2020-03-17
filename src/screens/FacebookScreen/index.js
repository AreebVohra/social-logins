import React, { Component } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { LoginManager, AccessToken, LoginButton } from 'react-native-fbsdk';

export default class FacebookScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    login = async () => {
        const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
        console.log('====================================');
        console.log(result);
        console.log('====================================');
    }

    render() {
        return (
            <View style={styles.container}>
                {/* <Button title="Facebook Login" onPress={this.login} /> */}
                <LoginButton
                    publishPermissions={["email"]}
                    onLoginFinished={
                        (error, result) => {
                            if (error) {
                                alert("Login failed with error: " + error.message);
                            } else if (result.isCancelled) {
                                alert("Login was cancelled");
                            } else {
                                alert("Login was successful with permissions: " + result.grantedPermissions)
                            }
                        }
                    }
                    onLogoutFinished={() => alert("User logged out")} />
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
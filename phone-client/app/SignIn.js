// app/SignIn.js

import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native';

import FBSDK, { LoginButton, AccessToken } from 'react-native-fbsdk';

import { onLoginFinished } from './fb-login';

class SignIn extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>oi</Text>
                <LoginButton
                    publishPermissions={["publish_actions"]}
                    onLoginFinished={onLoginFinished}
                    onLogoutFinished={() => alert("logout.")} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    }
});

export default SignIn;
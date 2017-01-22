import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native';

import Meteor, { createContainer } from 'react-native-meteor';
import SignIn from './SignIn';
import SignOut from './SignOut';

import { loginWithTokens } from './fb-login';

const url = 'ws://192.168.1.4:3000/websocket';
Meteor.connect(url);

class App extends Component {

    componentWillMount() {
        loginWithTokens();
    }

    render() {
        console.log(this.props)       
        return <SignIn />;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
});

export const StartUp = createContainer(() => {
    return {
        user: Meteor.user(),
    };
}, App);
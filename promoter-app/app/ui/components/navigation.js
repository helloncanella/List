import React, { Component, PropTypes } from 'react'
import { StyleSheet, Text, View, Navigator } from 'react-native'
import Login from 'ui/pages/login.js'
import PartUsersList from 'ui/pages/party-users-list.js'


export class Navigation extends Component {

    constructor(props) {
        super(props)
        this.initialRoute = this.getInitialRoute()
    }

    getInitialRoute() {
        let initialRoute

        if (this.props.userIsLogged)
            initialRoute = { name: 'party-users-list' }
        else
            initialRoute = { name: 'login' }

        return initialRoute
    }

    renderScene(route, navigator) {
        let component

        switch (route.name) {
            case 'party-users-list':
                component = <PartUsersList navigator={navigator} />
                break;
            case 'login':
            default:
                component = <Login navigator={navigator} />
                break;
        }

        return component
    }

    render() {
        return (
            <Navigator
                initialRoute={this.initialRoute}
                renderScene={this.renderScene}
                />
        );
    }
}

Navigation.propTypes = {
    userIsLogged: PropTypes.bool.isRequired
}
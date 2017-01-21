import React, { Component, PropTypes } from 'react'
import { StyleSheet, Text, View, Navigator } from 'react-native'
import { Login } from 'ui/pages/login.js'
import {PartiesList} from 'ui/pages/parties-list.js'

export class Navigation extends Component {

    constructor(props) {
        super(props)
        this.initialRoute = this.getInitialRoute()
    }

    getInitialRoute() {
        let initialRoute
        if (this.props.userIsLogged)
            initialRoute = { name: 'parties' }
        else
            initialRoute = { name: 'login' }

        return initialRoute
    }

    renderScene(route, navigator) {
        let component

        switch (route.name) {
            case 'parties':
              component = <PartiesList navigator={navigator}/>        
              break;
            // case 'party': 
            //   component = <Party id={route.id} navigator={navigator}/>
            //   break;
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
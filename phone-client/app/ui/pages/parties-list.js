import React, { Component, PropTypes } from 'react'
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native'
import { typography, pressStyle } from 'ui/stylesheets/global.js'
import {database} from 'library/database.js'
import Meteor from 'react-native-meteor'

export default class PartiesList extends Component {

    constructor(){
        super()
        this.logout = this.logout.bind(this)
    }

    logout() {
        database.logout()
        this.props.navigator.push({name:'login'})
    }

    render() {
        const {container, text} = styles
        return (
            <View style={container}>
                <Text style={text}>Parties</Text>
                <TouchableHighlight onPress={this.logout} {...pressStyle} >
                    <Text style={text}>Logout</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    text: {
        fontSize: typography.big
    }

});


PartiesList.propTypes = {}
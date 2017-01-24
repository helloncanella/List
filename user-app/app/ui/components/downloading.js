import React, { Component, PropTypes } from 'react'
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import { color } from 'ui/stylesheets/global.js'

export default class Downloading extends Component {
    render() {
        const {container} = styles
        return <ActivityIndicator color={color.primary} size={150} animating={true}  style={container}/>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    }
});


Downloading.propTypes = {}
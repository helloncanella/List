import React, { Component, PropTypes } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { color, typography } from 'ui/stylesheets/global.js'
import Logo from 'ui/components/logo.js'

export default class SplashScreen extends Component {
    render() {
        const {container, text} = styles
        return (
            <View style={container}>
                <Logo />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: color.primary
    },
    text:{
        fontSize: typography.huge,
        color: 'white' 
    }
});


SplashScreen.propTypes = {

}
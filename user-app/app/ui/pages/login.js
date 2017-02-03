import React, { Component, PropTypes } from 'react'
import { StyleSheet, Text, View, TouchableHighlight, Image } from 'react-native'
import { pressStyle, typography, grid, color } from 'ui/stylesheets/global.js'
import { database } from 'library/database.js'
import Logo from 'ui/components/logo.js'

export default class Login extends Component {
    constructor() {
        super()
        this.loginWithFacebook = this.loginWithFacebook.bind(this)
        this.goToDashBoard = this.goToDashBoard.bind(this)
    }

    goToDashBoard() {
        this.props.navigator.push({ name: 'dashboard' })
    }

    loginWithFacebook() {
        const {goToDashBoard} = this
        
        database
            .login()
            .then(goToDashBoard)
            .catch(err => alert(err))       
    }

    render() {
        const {container, title, image} = styles
            , imageUrl = 'http://www.freeiconspng.com/uploads/facebook-sign-in-button-png-26.png'

        return (
            <View style={[container, grid]}>
                <Logo />
                <TouchableHighlight onPress={this.loginWithFacebook} {...pressStyle} >
                    <Image style={image} source={{ uri: imageUrl }} />
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
        backgroundColor: color.primary
    },
    title: {
        fontSize: typography.huge,
        color: 'white',
        marginBottom: 40,
    },
    image: {
        width: 300,
        height: 50
    }
});


Login.propTypes = {
    navigator: PropTypes.object.isRequired
}
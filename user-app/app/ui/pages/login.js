import React, { Component, PropTypes } from 'react'
import { StyleSheet, Text, View, TouchableHighlight, Image } from 'react-native'
import { pressStyle, typography, grid, color } from 'ui/stylesheets/global.js'
import { database } from 'library/database.js'

export default class Login extends Component {
    constructor() {
        super()
        this.loginWithFacebook = this.loginWithFacebook.bind(this)
        this.goToPartiesList = this.goToPartiesList.bind(this)
    }

    goToPartiesList() {
        this.props.navigator.push({ name: 'parties' })
    }

    loginWithFacebook() {
        const {goToPartiesList} = this
        
        database
            .loginWithFacebook()
            .then(goToPartiesList)
            .catch(err => alert(err))
       
    }

    render() {
        const {container, title, image} = styles
            , imageUrl = 'http://www.freeiconspng.com/uploads/facebook-sign-in-button-png-26.png'

        return (
            <View style={[container, grid]}>
                <Text style={title}>UListMe</Text>
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
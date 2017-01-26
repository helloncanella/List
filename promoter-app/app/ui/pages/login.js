import React, { Component, PropTypes } from 'react'
import { StyleSheet, Text, View, ScrollView, TouchableHighlight } from 'react-native'
import { color, grid, pressStyle } from 'ui/stylesheets/global.js'
import TextField from 'react-native-md-textinput';
import Logo from 'ui/components/logo.js'

export default class Login extends Component {

    constructor(){
        super()
        this.login = this.login.bind(this)
    }

    login(){
        alert('olá!')
    }

    button() {
        const {loginButton, loginButtonText} = styles         

        return (
            <TouchableHighlight {...pressStyle} onPress={this.login} style={loginButton} > 
                <Text style={loginButtonText}>login</Text>
            </TouchableHighlight>
        )
    }

    form() {
        const {form} = styles
            , textStyles = { height: 30, dense: true, highlightColor: 'white', labelColor:'white', textColor: 'white' }
            , Button = ()=>this.button()

        return (
            <View style={[grid, form]}>
                <TextField label={'Name'} {...textStyles} />
                <TextField label={'E-mail'} {...textStyles} />
                <Button />
            </View>
        )
    }

    render() {
        const {container} = styles
            , Form = () => this.form()

        return (
            <ScrollView contentContainerStyle={container}>
                <Logo />
                <Form />
            </ScrollView>
        );
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.primary,
        justifyContent: 'center',
        paddingTop: 30,
        paddingBottom: 30
    },
    loginButton: {
        padding: 10,
        borderRadius: 10,
        marginTop: 50,
        alignSelf: 'stretch',
        backgroundColor:'#C2185B'
    },
    loginButtonText: {
        color: 'white',
        fontSize: 25,
        textAlign: 'center',

    }
});


Login.propTypes = {}
import React, { Component, PropTypes } from 'react'
import { StyleSheet, Text, View, ScrollView, TouchableHighlight } from 'react-native'
import { color, grid, pressStyle } from 'ui/stylesheets/global.js'
import TextField from 'react-native-md-textinput';
import Logo from 'ui/components/logo.js'
import { database } from 'library/database.js'

export default class Login extends Component {

    constructor() {
        super()

        this.login = this.login.bind(this)
        this.showLoginError = this.showLoginError.bind(this)
        this.goToPartyUsersList = this.goToPartyUsersList.bind(this)
        this.onChangeText = this.onChangeText.bind(this)

        this.state = {
            loginError: '',
            username: '',
            password: ''
        }

    }

    shouldComponentUpdate(nextProps, nextState){
        const {username, password, loginError} = nextState
        
        if(loginError !== this.state.loginError) return true
        else if(username === this.state.username || password === this.state.password ) return false            
        
        return true
    }

    showLoginError(error) {
        let message 
        const {reason} = error

        if(reason === "User not found") message = "Usuário não encontrado" 
        else if(reason === "Incorrect password") message = "Senha incorreta"

        this.setState({loginError: message})

    }

    goToPartyUsersList() {
        this.props.navigator.push({name:'party-users-list'})
    }

    login() {
        const {showLoginError, goToPartyUsersList} = this

        const {username, password} = this.state

        database
            .login({ username, password })
            .then(goToPartyUsersList)
            .catch(showLoginError)
    }

    loginButton() {
        const {loginButton: button, loginButtonText} = styles

        return (
            <TouchableHighlight {...pressStyle} onPress={this.login} style={button} >
                <Text style={loginButtonText}>login</Text>
            </TouchableHighlight>
        )
    }


    onChangeText(field, text) {
        const newState = {}
        newState[field] = text
        this.setState(newState)
    }

    form() {
        const {form} = styles
            , textStyles = { height: 40, dense: false, highlightColor: 'white', labelColor: 'white', textColor: 'white' }
            , LoginButton = () => this.loginButton()
            , {onChangeText} = this
            , {username, password} = this.state
            

        return (
            <View style={[grid, form]}>
                <TextField value = {username} label={'Nome de usuário'} {...textStyles} onChangeText={text => onChangeText('username', text)} />
                <TextField value = {password} label={'Senha'} {...textStyles} onChangeText={text => onChangeText('password', text)} />
                <LoginButton />
            </View>
        )
    }

    loginError(){
        const {loginError} = styles
        return <Text style={loginError}>{this.state.loginError}</Text>
    }

    render() {
        const {container} = styles
            , Form = () => this.form()
            , LoginError = () => this.loginError()

        return (
            <ScrollView contentContainerStyle={container}>
                <Logo />
                <LoginError />
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
        backgroundColor: '#C2185B'
    },
    loginButtonText: {
        color: 'white',
        fontSize: 25,
        textAlign: 'center',

    },
    loginError: {
        textAlign: 'center',
        fontSize: 17,
        color: 'white',
        marginBottom: 5
    }
});


Login.propTypes = {
    navigator: PropTypes.object.isRequired
}
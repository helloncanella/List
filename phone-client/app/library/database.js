import React, { Component, PropTypes } from 'react'
import { StyleSheet, Text, View, AsyncStorage } from 'react-native'
import Meteor, { createContainer } from 'react-native-meteor';
import { AccessToken, LoginManager } from 'react-native-fbsdk';

var printError = (err) => alert(err)

class Database {

    constructor() {
        this.meteorLogin = this.meteorLogin.bind(this)
        this.createContainer = createContainer
        this.subscribe = Meteor.subscribe
        this.call = Meteor.call
        this.collection = Meteor.collection
    }

    connect() {       
        const {subscribeToUserData} = this

        Meteor.connect('ws://192.168.1.4:3000/websocket');

        return new Promise((resolve, reject) => {
            const
                onLoginResumed = () => { subscribeToUserData() ; resolve()},
                onError = error => reject(error),
                onConnected = () => { this.resumeLogin().then(onLoginResumed).catch(onError) }

            Meteor.ddp.on('connected', onConnected)
            setTimeout(() => { reject('Problemas de Conexão!') }, 300 * 60)
        })

    }

    subscribeToUserData(){
        database.subscribe("loggedUser")
    }

    getAcessToken() {
        return AccessToken.getCurrentAccessToken()
    }

    resumeLogin() {
        const {meteorLogin} = this
        return this.getAcessToken().then(meteorLogin)
    }

    loggedUser() {
        const allUserData = database.collection("users").findOne({ _id: Meteor.userId })
            , partialUserData = Meteor.user()
            
        return  allUserData || partialUserData
    }

    logout() {
        Meteor.logout()
        LoginManager.logOut()
    }

    storeLoginData(token, userId) {
        const Data = Meteor.getData()
        AsyncStorage.setItem("loginToken", token);
        Data._tokenIdSaved = token;
        Meteor._userIdSaved = userId;
    }


    meteorLogin(data) {
        const self = this

        return new Promise((resolve, reject) => {
            if (!data) resolve()
            else {
                const onEnd = (err, result) => {
                    if (err) reject(err)
                    self.storeLoginData(result.token, result.id)
                    resolve()
                }
                Meteor.call('login', { facebook: data }, onEnd);
            }

        })

    }

    loginWithFacebook() {
        const {meteorLogin} = this

        const onSucess = (result) => {
            if (result.isCancelled) throw ('Login cancelled');
            else this.getAcessToken().then(meteorLogin)
        }

        return LoginManager
            .logInWithReadPermissions(['public_profile'])
            .then(onSucess)
            .catch(err => { throw err })

    }

    userIsLogged() {
        return !!this.loggedUser()
    }

}

Database.propTypes = {}

//fileSystem must be a singleton
export const database = new Database()

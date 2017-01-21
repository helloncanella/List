import React, { Component, PropTypes } from 'react'
import { StyleSheet, Text, View, AsyncStorage } from 'react-native'
import Meteor from 'react-native-meteor';
import { AccessToken, LoginManager } from 'react-native-fbsdk';

var printError = (err) => alert(err)

class Database {

    constructor() {
        this.meteorLogin = this.meteorLogin.bind(this)
    }

    connect() {
        Meteor.connect('ws://192.168.1.4:3000/websocket');

        return new Promise((resolve, reject) => {
            const
                onError = error => reject(error)
                onConnected = () => this.resumeLogin().then(resolve).catch(onError)
            
            Meteor.ddp.on('connected', onConnected)          
            setTimeout(() => {reject('Problemas de Conexão!')}, 300*60)
        })
   }

    getAcessToken() {
        return AccessToken.getCurrentAccessToken()
    }

    resumeLogin() {
        const {meteorLogin} = this
        return this.getAcessToken().then(meteorLogin)
    }

    loggedUser() {
        return Meteor.user()
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

    meteorLogin(data, callback) {
        const self = this

        return new Promise((resolve, reject) => {
            if(!data) resolve()

            else {
                const onEnd = (err, result) => {
                    if (err) reject (err)
                    else {
                        self.storeLoginData(result.token, result.id)
                        if (callback) callback()
                        resolve()
                    }
                }
                Meteor.call('login', { facebook: data }, onEnd);
            }
        })

    }

    loginWithFacebook(callback) {
        const {meteorLogin} = this

        const onSucess = (result) => {
            if (result.isCancelled) alert('Login cancelled');
            else this.getAcessToken().then(data => meteorLogin(data, callback))
        }

        LoginManager
            .logInWithReadPermissions(['public_profile'])
            .then(onSucess, printError);
    }
    
    userIsLogged() {
        return !!this.loggedUser()
    }
}

Database.propTypes = {}

//fileSystem must be a singleton
export const database = new Database()

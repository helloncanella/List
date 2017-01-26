import React, { Component, PropTypes } from 'react'
import { StyleSheet, Text, View, AsyncStorage } from 'react-native'
import Meteor, { createContainer } from 'react-native-meteor';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import LoginService from 'library/login-service.js'

var printError = (err) => alert(err)

class Database {

    constructor() {
        // this.meteorLogin = this.meteorLogin.bind(this) //TODO: Remove to LoginService 
        this.createContainer = createContainer
        this.subscribe = Meteor.subscribe
        this.call = Meteor.call // TODO: improve to consider connection errror
        this.collection = Meteor.collection

        this.loginService = new LoginService()
    }

    connect() {
        const {subscribeToUserData} = this

        Meteor.connect('ws://192.168.1.4:3000/websocket');

        return new Promise((resolve, reject) => {
            const
                onLoginResumed = () => { subscribeToUserData(); resolve() },
                onError = error => reject(error),
                //TODO: replace this.resumeLogin by loginService.resumeLogin
                onConnected = () => { 
                    //this.resumeLogin().then(onLoginResumed).catch(onError)
                    this.loginService.resumeLogin()
                        .then(onLoginResumed)
                        .catch(onError) 
                }

            Meteor.ddp.on('connected', onConnected)

            setTimeout(() => { reject('Problemas de Conexão!') }, 3000 * 60)
        })

    }

    subscribeToUserData() {
        //TODO: replace "database by this"
        // database.subscribe("loggedUser")
        this.subscribe("loggedUser")
    }


    loggedUser() {
        //TODO: replace "database by this"
        // const allUserData = database.collection("users").findOne({ _id: Meteor.userId })
        const allUserData = this.collection("users").findOne({ _id: Meteor.userId })
            , partialUserData = Meteor.user()

        return allUserData || partialUserData
    }

    logout() {
        Meteor.logout()
        // LoginManager.logOut() //TODO: replace by loginService.logout()
        this.loginService.logout()
    }

    userIsLogged() {
        return !!this.loggedUser()
    }

    /***
     * 
     * LOGIN SERVICE RELATED METHODS. 
     * 
     * TODO: move to LoginService
     * 
     */

    // storeLoginData(token, userId) {
    //     const Data = Meteor.getData()
    //     AsyncStorage.setItem("loginToken", token);
    //     Data._tokenIdSaved = token;
    //     Meteor._userIdSaved = userId;
    // }

    // getAcessToken() {
    //     return AccessToken.getCurrentAccessToken()
    // }

    // resumeLogin() {
    //     const {meteorLogin} = this
    //     return this.getAcessToken().then(meteorLogin)
    // }

    // meteorLogin(data) {
    //     const self = this

    //     return new Promise((resolve, reject) => {
    //         if (!data) resolve()
    //         else {
    //             const onEnd = (err, result) => {
    //                 if (err) {
    //                     /*console.err(err);*/
    //                     reject(err)
    //                 }
    //                 else {
    //                     self.storeLoginData(result.token, result.id)
    //                     resolve()
    //                 }
    //             }
    //             Meteor.call('login', { facebook: data }, onEnd);
    //         }

    //     })

    // }

    //TODO: replace by login and inside it do loginService.login()
    // loginWithFacebook() {
    //     const {meteorLogin} = this

    //     const onSucess = (result) => {
    //         if (result.isCancelled) throw ('Login cancelled');
    //         else this.getAcessToken().then(meteorLogin)
    //     }

    //     return LoginManager
    //         .logInWithReadPermissions(['public_profile'])
    //         .then(onSucess)
    //         .catch(err => { throw err })

    // }
    
    login(){
        this.loginService.login()
    }

}

Database.propTypes = {}

//fileSystem must be a singleton
export const database = new Database()

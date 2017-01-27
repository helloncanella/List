import React, { Component, PropTypes } from 'react'
import { StyleSheet, Text, View  } from 'react-native'
import Meteor, { createContainer } from 'react-native-meteor';

import LoginService from 'library/login-service.js'

var printError = (err) => alert(err)

class Database {

    constructor() {
        this.createContainer = createContainer
        this.subscribe = Meteor.subscribe
        this.call = Meteor.call // TODO: improve to consider connection errror
        this.collection = Meteor.collection
        this.subscribeToUserData = this.subscribeToUserData.bind(this)

        this.loginService = new LoginService()
    }

    connect() {
        const {subscribeToUserData} = this

        Meteor.connect('ws://192.168.1.4:3000/websocket');

        return new Promise((resolve, reject) => {
            const
                onLoginResumed = () => { subscribeToUserData(); resolve() },
                onError = error => reject(error),
                
                onConnected = () => { 
                    this.loginService.resumeLogin()
                        .then(onLoginResumed)
                        .catch(onError) 
                }

            Meteor.ddp.on('connected', onConnected)

            setTimeout(() => { reject('Problemas de Conexão!') }, 3000 * 60)
        })

    }

    login(userData){
        return this.loginService.login(userData) //Promise
    }

    logout() {
        Meteor.logout()
        this.loginService.logout()
    }
    
    userIsLogged() {
        return !!this.loggedUser()
    }


    loggedUser() {
        const allUserData = this.collection("users").findOne({ _id: Meteor.userId })
            , partialUserData = Meteor.user()

        return allUserData || partialUserData
    }

    subscribeToUserData() {
        this.subscribe("loggedUser")
    } 
    
}

Database.propTypes = {}

//fileSystem must be a singleton
export const database = new Database()

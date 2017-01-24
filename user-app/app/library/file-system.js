import React, { Component, PropTypes } from 'react'
import { StyleSheet, Text, View } from 'react-native'

class FileSystem {
    
    constructor() {
        this.userData = null
    }
    
    getUserData() { 
        return Object.assign({}, this.userData) 
    }
    
    saveUserData(userData) { 
        this.userData = userData 
    }
    
    userIsLogged() { 
        return !!this.userData 
    }
}

FileSystem.propTypes = {}

//fileSystem must be a singleton
export const fileSystem = new FileSystem()
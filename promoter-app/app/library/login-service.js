import Meteor from 'react-native-meteor';
import { AsyncStorage } from 'react-native'

export default class LoginService {

    /**
     * 
     * PUBLIC METHODS
     * 
     */

    constructor() {
        this.storeUserData = this.storeUserData.bind(this)
        this.login = this.login.bind(this)
    }

    resumeLogin() {
        const {login} = this
        return this.fetchStoredUserData().then(login)
    }

    login({username, password}) {
        const {storeUserData} = this

        return new Promise((resolve, reject) => {
            Meteor.loginWithPassword(username, password, (err) => {
                if (!err) {
                    storeUserData({ username, password })
                    resolve()
                }
                else {
                    console.log(err)
                    reject(err)
                }
            })
        })

    }

    logout() {
        AsyncStorage.multiRemove(['username', 'password'], err => console.err(err))
    }

    /**
     * 
     * PRIVATE METHODS
     * 
     */

    storeUserData({username, password}) {
        try {
            AsyncStorage.setItem('username', username)
            AsyncStorage.setItem('password', password)
        } catch (error) {
            console.error(error)
        }
    }

    fetchStoredUserData() {
        const fetchUsername = AsyncStorage.getItem('username')
            , fetchPassword = AsyncStorage.getItem('password')

        return Promise.all([fetchUsername, fetchPassword]).then(([username, password]) => {
            if (!username) throw 'fetched username by AsyncStorage is empty'
            else if (!password) throw 'fetched password by AsyncStorage is empty'
            else return { username, password }
        })
    }
}
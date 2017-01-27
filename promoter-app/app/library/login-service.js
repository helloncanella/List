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
            , onFetched = ({username, password}) => {
                if (username && password) return login({username, password})
                else return 
            }

        return this.fetchStoredUserData().then(onFetched)
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
        AsyncStorage.multiRemove(['username', 'password'])
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
            return { username, password }
        })
    }
}
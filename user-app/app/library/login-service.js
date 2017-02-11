import Meteor from 'react-native-meteor';
import { AsyncStorage } from 'react-native'
import { AccessToken, LoginManager } from 'react-native-fbsdk';

export default class LoginService {

    /**
     * 
     * PUBLIC METHODS
     * 
     */

    constructor() {
        this.meteorLogin = this.meteorLogin.bind(this)
    }

    resumeLogin() {
        const {meteorLogin} = this
        return this.getAcessToken().then(meteorLogin)
    }

    login() {
        const {meteorLogin} = this

        const onSucess = (result) => {
            if (result.isCancelled) throw ('Login cancelled');
            else this.getAcessToken().then(meteorLogin)
        }

        return LoginManager
            .logInWithReadPermissions(['public_profile', 'user_photos', 'user_birthday', 'email'])
            .then(onSucess)
            .catch(err => { console.log(err); throw err })

    }

    logout() {
        LoginManager.logOut()
    }

    /**
     * 
     * PRIVATE METHODS
     * 
     */

    storeLoginData(token, userId) {
        const Data = Meteor.getData()
        AsyncStorage.setItem("loginToken", token);
        Data._tokenIdSaved = token;
        Meteor._userIdSaved = userId;
    }

    getAcessToken() {
        return AccessToken.getCurrentAccessToken()
    }


    meteorLogin(data) {
        const self = this

        return new Promise((resolve, reject) => {
            if (!data) resolve()
            else {
                const onEnd = (err, result) => {
                    if (err) {
                        /*console.err(err);*/
                        reject(err)
                    }
                    else {
                        self.storeLoginData(result.token, result.id)
                        resolve()
                    }
                }
                Meteor.call('login', { facebook: data }, onEnd);
            }

        })

    }



}
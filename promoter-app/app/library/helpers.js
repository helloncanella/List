import { Linking } from 'react-native'

export const openFacebook = function(url) {

    const appUrl = "fb://facewebmodal/f?href=" + url
        , httpUrl = url

    //if the app can't not be oppened the httpUrl will be.
    Linking.canOpenURL(appUrl).then(supported => {
        if (supported) 
            return Linking.openURL(appUrl);
        else 
            return Linking.openURL(httpUrl);
    }).catch(err => console.error('An error occurred', err));

}
import {Dimensions} from 'react-native'

export const color = {
    primary: '#D81B60',
    secondary: '#424242',
    borderLine: '#EEEEEE',
    silentText: '#757575'
}

export const typography = {
    small: 13,
    normal: 18,
    big: 30,
    huge: 70, 
    extremlyHuge: 150
}

export const grid = {
    padding: 15
}

export const pressStyle = {
    underlayColor: "transparent",
    activeOpacity: 0.7
}

export function imageDimensions (widthLimit=1, aspectRatio=4/3) {
    const windowWidth = Dimensions.get("window").width * widthLimit
    
    return {
        width: windowWidth,
        height: windowWidth/aspectRatio
    }
    
}
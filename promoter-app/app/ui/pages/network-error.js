import React, { Component, PropTypes } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { color, typography } from 'ui/stylesheets/global.js'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

export default class NetworkError extends Component {
    
    icon(){
        return <MaterialIcon size={150} color="white" name="cancel"/>
    }

    render() {
        const {container, text} = styles
            , Icon = () => this.icon()
        
        return (
            <View style={container}>
                <Icon />
                <Text style={text}>Problemas com sua conexão :)</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: color.primary
    },
    text:{
        marginTop: 15,
        fontSize: typography.big,
        textAlign: 'center',
        color: 'white' 
    }
});


NetworkError.propTypes = {

}
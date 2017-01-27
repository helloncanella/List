import React, { Component, PropTypes } from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default class Logo extends Component {
    render() {
        const {fontSize = 70, color = 'white', textAlign='center'} = this.props
            , {text} = styles

        return <Text style={[{fontSize, color, textAlign}, text]}>ulistme</Text>
    }
}

const styles = StyleSheet.create({
    text: {
        fontFamily: 'Satisfy-Regular'
    }
});


Logo.propTypes = {
    fontSize: PropTypes.number,
    color: PropTypes.string,
    textAlign: PropTypes.string
}
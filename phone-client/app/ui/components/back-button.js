import React, { Component, PropTypes } from 'react'
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native'
import { pressStyle } from 'ui/stylesheets/global.js'
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class BackButton extends Component {

    back() {
        this.props.navigator.pop()
    }

    render() {
        const {touchable} = styles
            , {style: styleProps} = this.props

        const back = this.back.bind(this)

        return (
            <TouchableHighlight {...pressStyle} onPress={back} style={[touchable, styleProps]}>
                <Icon name="keyboard-arrow-left" size={50} color="white" />
            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
    touchable: {
        backgroundColor: 'rgba(0,0,0,0)'
    }
});


BackButton.propTypes = {
    navigator: PropTypes.object.isRequired,
    // style: PropTypes.object.isRequerired
}
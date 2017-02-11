import React, { Component, PropTypes } from 'react'
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native'
import { pressStyle } from 'ui/stylesheets/global.js'


export default class Card extends Component {
    render() {
        const {onPress, style, children} = this.props
      
        return (
            <TouchableHighlight onPress={onPress} {...pressStyle} style={style}>
                <View style={styles.card}>
                    {children}
                </View>
            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
    card: {
        marginBottom: 30,
        elevation: 1,
        borderWidth: 0.0,
        paddingBottom: 10,
        borderRadius: 5
    }
});


Card.propTypes = {

}
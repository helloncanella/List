import React, { Component, PropTypes } from 'react'
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native'
import { typography, pressStyle, grid, color, imageDimensions } from 'ui/stylesheets/global.js'
import Icon from 'react-native-vector-icons/MaterialIcons'

export default class ReturnMenu extends Component {
    returnButton() {
        const pop = this.props.navigator.pop
            
        return (
            <TouchableHighlight underlayColor="transparent" onPress={pop} style={styles.iconAlignmentAdjustment}>
                <Icon name="navigate-before" color={color.primary} size={35} />
            </TouchableHighlight>
        )
    }

    render() {
        const {topMenu} = styles
            , ReturnButton = this.returnButton.bind(this)

        return (
            <View style={[grid, topMenu]}>
                <ReturnButton />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    topMenu: {        
        paddingTop: 10,
        paddingBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'transparent'
    },
    iconAlignmentAdjustment:{
        marginLeft:-10
    }
});


ReturnMenu.propTypes = {
    navigator: PropTypes.object.isRequired
}
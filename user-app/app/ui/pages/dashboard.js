import React, { Component, PropTypes } from 'react'
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native'
import PartiesList from 'ui/components/parties-list.js'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { grid, color } from 'ui/stylesheets/global.js'
import { database } from 'library/database.js'

export default class Dashboard extends Component {
    topMenu() {
        const {topMenu} = styles
          
        return (
            <View style={[grid, topMenu]}>
                <Icon name="menu" color={color.primary} size={40}/>
            </View>
        ) 
    }

    bottomMenu() {

    }

    render() {
        const {container} = styles
            , TopMenu = this.topMenu.bind(this)

        return (
            <View style={container}>
                <TopMenu />
                <PartiesList navigator={this.props.navigator} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    topMenu:{
        paddingTop: 10,
        paddingBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});


Dashboard.propTypes = {}
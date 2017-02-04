import React, { Component, PropTypes } from 'react'
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native'
import PartiesList from 'ui/components/parties-list.js'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { grid, color } from 'ui/stylesheets/global.js'
import { database } from 'library/database.js'
import TabsWrapper from 'ui/components/tabs-wrapper.js'
import Notifications from 'ui/components/notifications.js'

export default class Dashboard extends Component {
    topMenu() {
        const {topMenu} = styles

        return (
            <View style={[grid, topMenu]}>
                <Icon name="menu" color={color.primary} size={30} />
            </View>
        )
    }

    tabs() {
        const {tabBarUnderlineStyle} = styles
        return (
            <TabsWrapper>
                <PartiesList navigator= { this.props.navigator } tabLabel='local-bar' />
                <Notifications navigator= { this.props.navigator } tabLabel='event-note' />
                <Notifications navigator= { this.props.navigator } tabLabel='favorite' />
                <Notifications navigator= { this.props.navigator } tabLabel='notifications' />                              
            </TabsWrapper>
        )
            
    }

    render() {
        const {container} = styles
            , TopMenu = this.topMenu.bind(this)
            , Tabs = this.tabs.bind(this)
        return (
            <View style={container}>
                <TopMenu />
                <Tabs />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    topMenu: {
        paddingTop: 10,
        paddingBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    tabBarUnderlineStyle:{
        borderWidth:0,
        height:0
    }
});


Dashboard.propTypes = {}
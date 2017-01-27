import React, { Component, PropTypes } from 'react'
import { StyleSheet, Text, View, TouchableHighlight, Image } from 'react-native'
import Meteor, { createContainer, MeteorListView, MeteorComplexListView } from 'react-native-meteor'
import Loading from 'ui/components/downloading.js'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { grid, color, typography } from 'ui/stylesheets/global.js'

Meteor.connect('ws://192.168.1.4:3000/websocket');

class StartUp extends Component {

    icon(action, userId) {
        let callback, iconName, color = 'gray'

        if (action === 'accept') {
            callback = this.props.acceptUser.bind(this, userId)
            iconName = 'check'
            color = this.props.acceptedUsers.indexOf(userId) > - 1 && 'green' || color
        } else {
            callback = this.props.refuseUser.bind(this, userId)
            iconName = 'close'
            color = this.props.refusedUsers.indexOf(userId) > - 1 && 'red' || color
        }

        return (
            <TouchableHighlight onPress={callback} underlayColor='transparent'>
                <Icon name={iconName} size={45} color={color} />
            </TouchableHighlight>
        )
    }

    buttons(userId) {
        const Accept = this.icon.bind(this, 'accept', userId)
            , Refuse = this.icon.bind(this, 'refuse', userId)
            , {buttonsContainer} = styles

        return (
            <View style={buttonsContainer}>
                <Accept />
                <Refuse />
            </View>
        )
    }

    profile(data) {
        const {thumbnail, userName, row, social} = styles
            , image = 'https://scontent.fsdu6-1.fna.fbcdn.net/v/t1.0-9/12241179_836594613117947_1920520166121142338_n.png?oh=c386343d1b611c7f04c52d46cb9634eb&oe=58FD8758'

        return (
            <View style={social}>
                <Image style={thumbnail} source={{ uri: image }} />
                <Text style={userName}>{data.name}</Text>
            </View>
        )
    }

    renderUser(user) {
        const {_id: userId, profile} = user
            , Buttons = this.buttons.bind(this, userId)
            , Profile = this.profile.bind(this, profile) 
            , {row} = styles

        return (
            <View style={row}>
                <Profile />
                <Buttons />
            </View>
        )
    }

    topBar(){
        const {topBar, topBarText} = styles
            , {name: partyName = ''} = this.props.party 

        return (
            <View style={topBar}>   
                <Text style={topBarText}>{partyName}</Text>
            </View>
        )
    }

    list() {
        const {container} = styles
            , TopBar = this.topBar.bind(this)
            , {usersRequesting} = this.props 

        return (
            <View style={container}>
                <TopBar />
                <MeteorComplexListView elements={()=>usersRequesting} renderRow={this.renderUser.bind(this)} enableEmptySections={true} />
            </View>
        )
    }

    render() {
        const List = () => this.list()
        return this.props.userIsLoading ? <Loading /> : <List />
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    buttonsContainer: {
        flexDirection: 'row'
    },
    row: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: color.borderLine,
        padding: grid.padding,
        alignItems: 'center'
    },
    thumbnail: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 10
    },
    userName: {
        fontSize: 20/*typography.normal*/,
        marginBottom: 3,
        flex: 2 / 3
    },
    social: {
        flex: 2 / 3,
        flexDirection: 'row',
        alignItems: 'center'
    },
    topBar: {
        backgroundColor: 'gray',
        paddingTop: 10,
        paddingBottom: 10 
    },
    topBarText:{
        color: 'white',
        fontSize: typography.normal,
        textAlign: 'center'
    }
});

const findUsers = usersList => Meteor.collection('users').find({ _id: { $in: usersList } })

export default createContainer(() => {

    const usersSubscription = Meteor.subscribe("users.socialData")
        , partiesSubscription = Meteor.subscribe("parties")

    const party = Meteor.collection("parties").findOne() || {}
        , {refusedUsers = [], acceptedUsers = [], usersRequesting = [], _id: partyId } = party

    return {
        userIsLoading: !usersSubscription.ready(),
        party, 
        refusedUsers: findUsers(refusedUsers).map(user => user._id),
        acceptedUsers: findUsers(acceptedUsers).map(user => user._id),
        usersRequesting: findUsers(usersRequesting),
        acceptUser: userId => Meteor.call('party.acceptUser', { userId, partyId }),
        refuseUser: userId => Meteor.call('party.refuseUser', { userId, partyId })
    }

}, StartUp)


StartUp.propTypes = {
}



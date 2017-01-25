import React, { Component, PropTypes } from 'react'
import { StyleSheet, Text, View, TouchableHighlight, Image } from 'react-native'
import Meteor, { createContainer, MeteorListView } from 'react-native-meteor'
import Loading from 'ui/components/downloading.js'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { grid, color, typography } from 'ui/stylesheets/global.js'

Meteor.connect('ws://192.168.1.4:3000/websocket');

class StartUp extends Component {

    icon(action, userId) {
        let callback, iconName, color = 'black'

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


    list() {
        const {container} = styles

        return (
            <View style={container}>
                <MeteorListView collection="users" renderRow={this.renderUser.bind(this)} enableEmptySections={true} />
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
        flex: 1
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
    }
});

const findUsers = usersList => Meteor.collection('users').find({ _id: { $in: usersList } }).map(user => user._id)

export default createContainer(() => {

    const usersSubscription = Meteor.subscribe("users.socialData")
        , partiesSubscription = Meteor.subscribe("parties")

    const party = Meteor.collection("parties").findOne() || {}
        , {refusedUsers = [], acceptedUsers = [], usersRequesting = [], _id: partyId } = party

    return {
        userIsLoading: !usersSubscription.ready(),
        refusedUsers: findUsers(refusedUsers),
        acceptedUsers: findUsers(acceptedUsers),
        usersRequesting: findUsers(usersRequesting),
        acceptUser: userId => Meteor.call('party.acceptUser', { userId, partyId }),
        refuseUser: userId => Meteor.call('party.refuseUser', { userId, partyId })
    }

}, StartUp)


StartUp.propTypes = {
}



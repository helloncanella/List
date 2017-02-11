import React, { Component, PropTypes } from 'react'
import { StyleSheet, Text, View, TouchableHighlight, Image } from 'react-native'
import Loading from 'ui/components/downloading.js'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { grid, color, typography, pressStyle } from 'ui/stylesheets/global.js'
import { database } from 'library/database.js'
import { openFacebook } from 'library/helpers.js'
import ReturnMenu from 'ui/components/return-menu.js'
import UsersSwipeCards from 'ui/components/users-swipe-cards.js'


class PartyUsersList extends Component {
  
    content(){
        const {usersRequesting} = this.props
        return this.props.userIsLoading ? <Loading /> : <UsersSwipeCards users={usersRequesting} />
    }

    render() {
        const {container} = styles            
            , Content = this.content.bind(this)

        return (
            <View style={container}>
                <ReturnMenu navigator={this.props.navigator} />
                <Content />
            </View>
        ) 
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
        flexDirection: 'row',
        alignItems: 'center'
    },
    topBar: {
        backgroundColor: 'gray',
        paddingTop: 10,
        paddingBottom: 10,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    topBarText: {
        color: 'white',
        fontSize: typography.normal,
    },
    logout: {
        color: 'white',
        fontSize: 15
    },
    socialTouch: {
        flex: 2 / 3        
    }
});

const findUsers = usersList => database.collection('users').find({ _id: { $in: usersList } })

export default database.createContainer(props => {

    const usersSubscription = database.subscribe("users.socialData")
        , partiesSubscription = database.subscribe("parties")

    const party = database.collection("parties").findOne({ _id: props.partyId }) || {}
        , {refusedUsers = [], acceptedUsers = [], usersRequesting = [], _id: partyId } = party


    return {
        userIsLoading: !usersSubscription.ready(),
        party,
        refusedUsers: findUsers(refusedUsers).map(user => user._id),
        acceptedUsers: findUsers(acceptedUsers).map(user => user._id),
        usersRequesting: findUsers(usersRequesting),
        acceptUser: userId => database.call('party.acceptUser', { userId, partyId }),
        refuseUser: userId => database.call('party.refuseUser', { userId, partyId }),
        navigator: props.navigator
    }

}, PartyUsersList)


PartyUsersList.propTypes = {
    partyId: PropTypes.string.isRequired
}



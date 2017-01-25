import React, { Component, PropTypes } from 'react'
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native'
import Meteor, { createContainer, MeteorListView } from 'react-native-meteor'
import Loading from 'ui/components/downloading.js'

Meteor.connect('ws://192.168.1.4:3000/websocket');

class StartUp extends Component {

    renderUser(user) {
        
        const {_id: userId, profile} = user

        console.log(this.props)
        return (
            <TouchableHighlight onPress={userId=>this.props.acceptUser(userId)}>
                <Text>{profile.name}</Text>
            </TouchableHighlight>
        )

    }

    // <TouchableHightlight onPress={userId=>this.props.acceptUser(userId)}>
    //             <Text>{profile.name}</Text>
    //         </TouchableHightlight>

    list() {
        const {container} = styles
        
        
        return (
            <View style={container}>
                <MeteorListView collection="users" renderRow={this.renderUser} enableEmptySections={true}/>
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
    }
});

const findUsers = usersList => Meteor.collection('users').find({_id:{$in:usersList}})

export default createContainer(() => {

    const usersSubscription = Meteor.subscribe("users.socialData")
        , partiesSubscription = Meteor.subscribe("parties")
    
    const party = Meteor.collection("parties").findOne() || {}
        , {refusedUsers = [], acceptedUsers = [], usersRequesting=[], _id: partyId } = party
       
    return {
        userIsLoading: !usersSubscription.ready(),
        refusedUsers: findUsers(refusedUsers),
        acceptedUsers: findUsers(acceptedUsers),
        usersRequesting: findUsers(usersRequesting),
        acceptUser: userId => Meteor.call('party.acceptUser', {userId, partyId}) ,
        refuseUser: userId => Meteor.call('party.refuseUser', {userId, partyId}) 
    }

}, StartUp)


StartUp.propTypes = {}



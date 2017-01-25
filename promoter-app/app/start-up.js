import React, { Component, PropTypes } from 'react'
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native'
import Meteor, { createContainer, MeteorListView } from 'react-native-meteor'
import Loading from 'ui/components/downloading.js'
import Icon from 'react-native-vector-icons/MaterialIcons';

Meteor.connect('ws://192.168.1.4:3000/websocket');

class StartUp extends Component {

    icon(action, userId){
    
        let callback, iconName, color='black'

        if(action === 'accept'){
            calback =  this.props.acceptUser.bind(this, userId)
            iconName = 'check'
            color = this.props.acceptedUsers.indexOf(userId) > - 1 && 'green'  
        }else{
            calback =  this.props.refuseUser.bind(this, userId)
            iconName = 'close'
            color = this.props.refusedUsers.indexOf(userId) > - 1 && 'red'
        }

        return (
            <TouchableHighlight onPress={calback}>
                <Icon name={iconName} size={50} color={color}/>
            </TouchableHighlight>
        )
    }

    renderUser(user) {
        
        const {_id: userId, profile} = user            
            , Accept = this.icon.bind(this, 'accept', userId)
            , Refuse = this.icon.bind(this, 'refuse', userId)

        return (
            <View>
                <Accept />
                <Refuse />
            </View>
        )

    }

    // profile(data){
    //     return 
    // }

    // renderUser(user) {
        
    //     const {_id: userId, profile} = user
     
    //     return (
    //         <View onPress={()=>this.props.acceptUser(userId)}>
    //             <View><Text>{profile.name}</Text></View>
    //         </TouchableHighlight>
    //     )

    // }

    list() {
        const {container} = styles
        
        
        return (
            <View style={container}>
                <MeteorListView collection="users" renderRow={this.renderUser.bind(this)} enableEmptySections={true}/>
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
    console.log('aqui') 

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



import { Meteor } from 'meteor/meteor'
import { throwErrorIfUserIsntLogged, updateParty } from '/server/imports/helpers.js'

Meteor.methods({

     //if the user is present, remove him from list, if not, add him
    'party.toggleUserPresence'(partytId) {
        throwErrorIfUserIsntLogged()

        let {usersRequesting = []} = Meteor.collection("parties").findOne({_id:partytId})
            , userId = Meteor.userId()
            , index = usersRequesting.indexOf(userId)           

        //usersRequesting is equal to number of users requesting presence in the party.    
        usersRequesting = [].concat(usersRequesting)

        if (index === -1) usersRequesting.push(userId)
        else usersRequesting.splice(index, 1)

        updateParty({usersRequesting}, partyId)
    },

})



import { Meteor } from 'meteor/meteor'
import { throwErrorIfUserIsntLogged, updateParty} from '/server/imports/helpers.js'
import Parties from '/collections/parties.js'

Meteor.methods({

     //if the user is present, remove him from list, if not, add him
    'party.toggleUserPresence'(partyId) {
        throwErrorIfUserIsntLogged()

        let {usersRequesting = []} = Parties.findOne({_id:partyId})
            , userId = Meteor.userId()
            , index = usersRequesting.indexOf(userId)           

        //usersRequesting is equal to number of users requesting presence in the party.    
        usersRequesting = [].concat(usersRequesting)

        if (index === -1) usersRequesting.push(userId)
        else usersRequesting.splice(index, 1)

        updateParty(partyId, {usersRequesting})
    },

    'party.refuseUser'({partyId, userId}){ console.log('refuse user', {partyId, userId})},

    'party.acceptUser'({partyId, userId}){ console.log('accept user', {partyId, userId}) },

})

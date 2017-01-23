import { Meteor } from 'meteor/meteor'
import { throwErrorIfUserIsntLogged, updateUser } from '/server/imports/helpers.js'

Meteor.methods({

     //if the user is present, remove him from list, if not, add him
    'party.toggleUserPresence'(partytId) {
        throwErrorIfUserIsntLogged()

        let {parties} = Meteor.users.findOne({_id:Meteor.userId()})
            , index = parties.indexOf(partytId)           

        parties = [].concat(parties)

        if (index === -1) parties.push(partytId)
        else parties.splice(index, 1)

        updateUser({parties})
    },

})



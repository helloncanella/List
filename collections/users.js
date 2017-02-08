import { Accounts } from 'meteor/accounts-base'
import { Meteor } from 'meteor/meteor'
import Parties from '/collections/parties.js'
import { updateUser, updateParty } from '/server/imports/helpers.js'

//creating a default promoter
if (Meteor.users.find({ "roles": "promoter" }).count() === 0) {

    const partyId = Parties.findOne()._id

    const options = {
        username: "fernandogomes",
        password: "fernandogomes",
        email: "fernandogomes@at.com",
    } 


    const userId = Accounts.createUser(options)

    const customData = {
        roles: ['employee','promoter'],
    } 

    updateUser(userId, customData)
    updateParty(partyId, { promoters: [userId] })


}

// Deny all client-side updates to user documents
Meteor.users.deny({
    update() { return true; }
});
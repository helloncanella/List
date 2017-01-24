import Parties from '/collections/parties.js'

export const throwErrorIfUserIsntLogged = () => {
    if (!Meteor.userId()) throw new Meteor.Error("User isn't logged")
}

export const updateUser = (dataUpdate) => {
    Meteor.users.update({ _id: Meteor.userId() }, { $set: dataUpdate })
}


export const updateParty = (partyId, dataUpdate) => {
    Parties.update({ _id: partyId }, { $set: dataUpdate })
}

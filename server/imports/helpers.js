import Parties from '/collections/parties.js'

export const throwErrorIfUserIsntLogged = () => {
    if (!Meteor.userId()) throw new Meteor.Error("User isn't logged")
}

export const updateUser = (userId, dataUpdate) => {
    Meteor.users.update({ _id: userId }, { $set: dataUpdate })
}

export const updateParty = (partyId, dataUpdate) => {
    Parties.update({ _id: partyId }, { $set: dataUpdate })
}


export const removeFromCollection = (item, collection) => {
    collection = [].concat(collection)
    
    const index = collection.indexOf(item)   
    
    if (index > -1) collection.splice(index, 1)

    return collection
}

export const addIntoCollection = (item, collection) => {
    collection = [].concat(collection)
       
    const index = collection.indexOf(item) 

    if (index === -1) collection.push(item)

    return collection
}



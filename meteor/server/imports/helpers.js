export const throwErrorIfUserIsntLogged = () => {
    if (!Meteor.userId()) throw Meteor.Error("User isn't logged")
}

export const updateUser = (dataUpdate) => {
    console.log(dataUpdate)
    Meteor.users.update({ _id: Meteor.userId() }, { $set: dataUpdate })
}


export const throwErrorIfUserIsntLogged = () => {
    if (!Meteor.userId()) throw new Meteor.Error("User isn't logged")
}

export const updateUser = (dataUpdate) => {
    Meteor.users.update({ _id: Meteor.userId() }, { $set: dataUpdate })
}


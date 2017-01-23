export const throwErrorIfUserIsntLogged = () => {
    if (!this.userId) throw Meteor.Error("User isn't logged")
}

export const updateUser = (dataUpdate) => {
    console.log(dataUpdate)
    Meteor.users.update({ _id: this.userId }, { $set: dataUpdate })
}


import Parties from '../collections/parties.js'
import {Meteor} from 'meteor/meteor'

const Users = Meteor.users

Meteor.publish('parties', function() {
  return Parties.find();
});

Meteor.publish('party', function(id) {
  return Parties.find({_id:id});
});

Meteor.publish('loggedUser', function() {
  return Users.find({_id: this.userId})
});

Meteor.publish('users.socialData', function() {
  return Users.find({}, {fields:{'services':1}}) //TODO: Include picture
});  
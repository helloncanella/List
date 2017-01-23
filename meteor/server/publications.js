import Parties from '../collections/parties.js'
import {Meteor} from 'meteor/meteor'

Meteor.publish('parties', function() {
  return Parties.find();
});

Meteor.publish('party', function(id) {
  return Parties.find({_id:id});
});

Meteor.publish('loggedUser', function() {
  return Meteor.users.find({_id: this.userId})
});  
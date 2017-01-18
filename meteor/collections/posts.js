Posts = new Meteor.Collection('posts');

if (Posts.find().count() === 0) {
  Posts.insert({
    title: 'Introducing Telescope',
    author: 'Sacha Greif',
    url: 'http://sachagreif.com/introducing-telescope/',
    details: "Long paragraph that we don't want to show on the list page, so only show in detail view"
  });

  Posts.insert({
    title: 'Meteor',
    author: 'Tom Coleman',
    url: 'http://meteor.com',
    details: "Long paragraph that we don't want to show on the list page, so only show in detail view"
  });

  Posts.insert({
    title: 'The Meteor Book',
    author: 'Tom Coleman',
    url: 'http://themeteorbook.com',
    details: "Long paragraph that we don't want to show on the list page, so only show in detail view"
  });
}

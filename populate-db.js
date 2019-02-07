#! /usr/bin/env node

console.log('This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: populatedb mongodb://your_username:your_password@your_dabase_url');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
if (!userArgs[0].startsWith('mongodb://')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}

var async = require('async')
var ShoppingList= require('./models/shopping-list')
var User = require('./models/user')
var Item = require('./models/item')



var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

var users = [new User({first_name: 'Arvid', family_name: 'Mildner', email: 'apa@gmail.com', shopping_list: []}),
             new User({first_name: 'Torun', family_name: 'Nilson', email: 'tonil@gmail.com', shopping_list: []}),
            ];
var items = [new Item({name:'Banana', type: 'Fruit'}), new Item({name:'Baguette', type: 'Bread'}), new Item({name:'Tomato', type: 'Vegetable'}) ]

users.forEach(function(user){
    user.save(function (err) {
      if (err) {
        console.log(err)
      }
      console.log('New user: ' + user);
    });
});

items.forEach(function(item){
  item.save(function (err) {
    if (err) {
      console.log(err)
    }
    console.log('New item: ' + item);
  });
});

var shopping_list = new ShoppingList({creator: users[0]._id, items: items});
shopping_list.save(function (err) {
  if (err) {
    console.log(err);
  }
});
shopping_list.populate('creator')
console.log('Shopping List: '+ shopping_list);
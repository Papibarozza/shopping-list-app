var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ItemSchema = new Schema(
  {
    name: {type:String},
    type: {type:String},
  }
);


// Virtual for user's URL
ItemSchema
.virtual('url')
.get(function () {
  return '/item/' + this.name;
});

//Export model
module.exports = mongoose.model('Item', ItemSchema);
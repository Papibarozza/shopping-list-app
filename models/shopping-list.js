var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ShoppingListSchema = new Schema(
  {
    creator: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    items: [{type: Schema.Types.ObjectId, ref: 'Item'}],
  }
);


// Virtual for user's URL
ShoppingListSchema
.virtual('url')
.get(function () {
  return '/shopping-lists/' + this._id;
});

//Export model
module.exports = mongoose.model('ShoppingList', ShoppingListSchema);
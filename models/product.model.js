const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user.model');

let schema = new Schema({
  size: { type: String, required: true },
  quantity: { type: Number, required: true},
  title: { type: String },
  price: { type: String },
  user: { type: Schema.Types.ObjectId, ref: 'User'}
});

mongoose.exports = mongoose.model('Product', schema);
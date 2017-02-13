let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let mongooseUniqueValidator = require('mongoose-unique-validator');

let schema = new Schema({
  firstName: { type: String, required: true },
  lastName : { type: String, required: true },
  password : { type: String, required: true },
  address  : { type: String },
  city  : { type: String },
  zipcode  : { type: String },
  state  : { type: String },
  email    : { type: String, required: true, unique: true }
});

schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('User', schema);
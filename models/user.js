let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let mongooseUniqueValidator = require('mongoose-unique-validator');

let schema = new Schema({
  firstName: { type: String, required: true },
  lastName : { type: String, required: true },
  password : { type: String, required: true },
  address  : { type: String, required: true },
  city  : { type: String, required: true },
  zipcode  : { type: String, required: true },
  email    : { type: String, required: true, unique: true }
});

schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('User', schema);
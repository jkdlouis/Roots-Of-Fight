let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let mongooseUniqueValidator = require('mongoose-unique-validator');

let schema = new Schema({
  firstName: { type: String || null, required: true },
  lastName : { type: String || null, required: true },
  password : { type: String || null, required: true },
  address  : { type: String || null },
  city  : { type: String || null },
  zipcode  : { type: String || null },
  state  : { type: String || null },
  email    : { type: String || null, required: true, unique: true }
});

schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('User', schema);
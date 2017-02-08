let express = require('express');
let router = express.Router();
let bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken');

let User = require('../models/user');

router.post('/', (req, res, next) => {
  var user = new User({
    firstName: req.body.firstName,
    lastName : req.body.lastName,
    password : bcrypt.hashSync(req.body.password, 10),
    email    : req.body.email
  });
  user.save((err, result) => {
    if(err) {
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    }
    res.status(201).json({
      message: 'User created',
      obj    : result
    });
  });
});

router.post('/login', (req, res, next) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if(err) {
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    }
    if(!user) {
      return res.status(401).json({
        title: 'Login failed',
        error: { message: 'Invalid Email' }
      });
    }
    if(!bcrypt.compareSync(req.body.password, user.password)) {
      return res.status(401).json({
        title: 'Login failed',
        error: { message: 'Invalid Password' }
      });
    }
    const token = jwt.sign({ user: user }, 'secret', { expiresIn: 7200 });
    res.status(200).json({
      message: 'Successfully Logged In',
      token: token,
      userId: user._id
    });
  });
});

module.exports = router;
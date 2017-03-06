const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

router.post('/', (req, res, next) => {
  const user = new User({
    firstName: req.body.firstName,
    lastName : req.body.lastName,
    password : bcrypt.hashSync(req.body.password, 8),
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
      token  : token,
      userId : user._id
    });
  });
});

router.post('/retrievepassword', (req, res, next) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if(err) {
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      })
    }
    if(!user) {
      return res.status(401).json({
        title: 'Invalid email',
        error: { message: 'Invalid email' }
      });
    }
    res.status(200).json({
      title   : 'Retrieve Password successfully',
      password: user.password
    })
  });
});

router.get('/user-profile', (req, res, next) => {
  const decoded = jwt.decode(req.query.token);
  User.findById(decoded.user._id, (err, user) => {
    if(err) {
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    }
    if(!user) {
      return res.status(500).json({
        title: 'User was not found',
        error: err
      })
    }
    res.status(200).json(
      {
      firstName: user.firstName,
      lastName : user.lastName,
      email    : user.email,
      address  : user.address,
      city     : user.city,
      state    : user.state,
      zipcode  : user.zipcode
    });
  });
});

router.put('/user-profile/update', (req, res, next) => {
  const decoded = jwt.decode(req.query.token);
  User.findById(decoded.user._id, (err, user) => {
    if(err) {
      return res.status(500).json(
        {
        title: 'An error occurred',
        error: err
      })
    }
    if(!user) {
      return res.status(500).json(
      {
        title: 'User was not found',
        error: err
      })
    }
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.address = req.body.address;
    user.city =  req.body.city;
    user.state = req.body.state;
    user.zipcode = req.body.zipcode;
    user.email = req.body.email;

    user.save((err, result) => {
      if(err) {
        console.log(req.body);
        console.log(134);
        return res.status(500).json({
          title: 'An error occurred',
          error: err
        });
      }
      res.status(200).json(
        {
        message: 'User has been updated',
        user : result
      })
    });
  });
});

module.exports = router;
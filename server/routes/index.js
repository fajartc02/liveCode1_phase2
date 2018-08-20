var express = require('express');
var router = express.Router();
const User = require('../models/modelUser')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const items = require('./items')


router.use('/items', items)
router.post('/register', function(req, res) {
  let newUser = {
    username: req.body.username,
    password: req.body.password
  }
  User.create(newUser)
  .then(user => {
    res.status(201).json({
      success: true,
      message: `account ${user.username} registered`
    })
  })
  .catch(err => {
    // console.log(err);
    res.status(500).json({
      success: false,
      message: err.message
    })
  })
})

router.post('/request_token', function(req, res) {
  let checkUser = {
    username: req.body.username,
    password: req.body.password
  }
  User.findOne({ username: checkUser.username })
  .then(user => {
    if(user) {
      let password = bcrypt.compareSync(req.body.password, user.password)
      if(password) {
        let token = jwt.sign({id: user._id}, process.env.JWT_KEY)
        res.status(201).json({
          token: token
        })
      }
    }
  })
  .catch(err => {
    res.status(500).json({
      err: err.message
    })
  })
})
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

require('dotenv').load();
var express = require('express');
var router = express.Router();
var db = require('monk')(process.env.MONGOLAB_URI);
var users = db.get('users');
var bcrypt = require('bcryptjs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/loggedin', function (req, res) {
  users.findOne({_id: req.session.id}, function (err, docs) {
    res.render('loggedin', { title: 'Colorado Liquor Map'});
  });
});

router.post('/loggedin', function (req, res, next) {
  users.findOne({email: req.body.email}, function (err, docs) {
    if (docs && bcrypt.compareSync(req.body.password, docs.password)) {
      req.session.id = docs._id;
      res.redirect('/loggedin');
    } else {
      res.render('index', {loginError: 'Invalid Email or Password'});
    }
  });
});

router.post('/signup', function (req, res) {
  users.find({email: req.body.email}, function (err, docs){
    if (docs.length === 0) {
      req.session.id = docs._id;
      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(req.body.password, salt, function (err, hash) {
          req.body.password = hash;
          users.insert(req.body);
        });
      });
      res.redirect('/loggedin');
    } else {
      res.render('signup', {signUpError: 'Seat\'s taken'});
    }
  });
});

router.get('/logout', function (req, res) {
  req.session = null;
  res.redirect('/');
});

module.exports = router;

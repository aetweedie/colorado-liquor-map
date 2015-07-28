// require('dotenv').load();
var express = require('express');
var router = express.Router();
// var db = require('monk')(process.env.MONGOLAB_URI);
// var users = db.get('users');
// var bcrypt = require('bcryptjs');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// router.post('/signup', function (req, res) {
//   users.find({username: req.body.username}, function (err, docs){
//     if (doc.length === 0) {
//       req.session.id = docs._id;
//       bcrypt.genSalt(10, function (err, salt) {
//         bcrypt.hash(req.body.password, salt, function (err, hash) {
//           req.body.password = hash;
//           users.insert(req.body);
//         });
//       });
//       res.redirect('/loggedin');
//     } else {
//       res.render('signup', {signUpError: 'Seat\'s taken'});
//     }
//   });
// });

module.exports = router;

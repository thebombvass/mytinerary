const express = require('express')
const router = express.Router()

//City Model 
const City = require('../../models/User');
//bcrypt
var bcrypt = require('bcrypt');
const saltRounds = 12;

// @route   GET api/users
// @desc    get all users
// @access  public
router.get('/', (req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => console.log(err))
});

// @route   POST api/users
// @desc    create an users
// @access  public
router.post('/', (req, res) => {
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        const newUser = new User({
            email: req.body.email,
            password: hash,
            profPicUrl: req.body.profPicUrl,
        });
        newUser.save().then(user => res.json(user))
            .catch(err => console.log(err));
    })
    //.then(function(data) {if(data) {blah }})
    //here redirect to logged in or if failed give an error message
});

module.exports = router
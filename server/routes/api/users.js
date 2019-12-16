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

// @route   POST api/users/login
// @desc    not creating a resource, just checking that email and password match
// @access  public
router.post('/login', (req, res) => {
    User.findOne({
        email: req.body.email
    }).then(function (user) {
        if (!user) {
            // res.redirect('/login'); //hmm
            res.json({message: 'User not found- please try another username'})
        } else {
            bcrypt.compare(req.body.password, user.password, function (err, result) {
                if (result == true) {
                    console.log('true')
                    // res.redirect('/')
                    res.json({message: "Log In Successful"})
                } else {
                    res.json({message: 'Incorrect Password'})
                }
                if (err) {
                    console.log(err)
                }
            })
        }
    })
});

// @route   POST api/users
// @desc    create a users
// @access  public
router.post('/create', (req, res) => {
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        const newUser = new User({
            email: req.body.email,
            password: hash,
            profPicUrl: req.body.profPicUrl,
        });
        newUser.save().then(user => {
                res.json(user)
            })
            .catch(err => console.log(err));
    })
    //.then(function(data) {if(data) {blah }})
    //here redirect to logged in or if failed give an error message
});


module.exports = router
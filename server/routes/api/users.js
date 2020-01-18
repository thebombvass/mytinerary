const express = require('express')
const router = express.Router()

//User Model 
const User = require('../../models/User');
//bcrypt
var bcrypt = require('bcrypt');
const saltRounds = 12;
//token
const jwt = require("jsonwebtoken");
const key = require('../../config/keys');
const passport = require('passport');


// @route   GET api/users
// @desc    get all users
// @access  public
// router.get('/', (req, res) => {
//     User.find()
//         .then(users => res.json(users))
//         .catch(err => console.log(err))
// });

// @route   GET api/users
// @desc    get the user that is signed in
// @access  public
router.get(
    "/",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      User
        .findOne({ _id: req.user.id })
        .then(user => {
          res.json(user);
        })
        .catch(err => res.status(404).json({ error: "User does not exist!" }));
    }
  );

// @route   GET api/users/google
// @desc    get the user signed in using google
// @access  public
router.get("/google",
    passport.authenticate("google", { scope: ['profile', 'email'] }),
)

// @route   GET api/users/google/redirect
// @desc    get the user signed in using google
// @access  public
router.get("/google/redirect", passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
        console.log('you reached callback URI')
        console.log(req.user)
        //successful login
        const payload = {
            id: req.user.googleId,
            username: req.user.email,
            avatarPicture: req.user.profPicUrl,
            displayName: req.user.displayName
        };
        //units in seconds, this is 3 hours
        const options = {expiresIn: 10800};
        jwt.sign(
        payload,
        key.secretOrKey,
        options,
        (err, token) => {
            if (err){
            res.json({
                success: false,
                token: "There was an error"
            });
            } else {
                res.redirect('http://localhost:3000/#' + token)
            }
        }
        );
        
    }
)

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
                    // res.json({message: "Log In Successful"})
                    const payload = {
                        id: user.id,
                        username: user.email,
                        avatarPicture: user.profPicUrl,
                        displayName: "" //this will need to be changed in the future when the displayName switch is made. including for now to avoid future bugs
                    };
                    //units in seconds, this is 3 hours
                    const options = {expiresIn: 10800};
                    jwt.sign(
                    payload,
                    key.secretOrKey,
                    options,
                    (err, token) => {
                        if(err){
                        res.json({
                            success: false,
                            token: "There was an error"
                        });
                        }else {
                            console.log('here')
                            res.json({
                                success: true,
                                token: token
                            });
                        }
                    }
                    );
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
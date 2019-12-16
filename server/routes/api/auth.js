const express = require('express')
const router = express.Router()

//City Model 
const City = require('../../models/User');
//bcrypt
var bcrypt = require('bcrypt');
const saltRounds = 12;


// @route   POST api/users/login
// @desc    not creating a resource, just checking that email and password match
// @access  public
router.post('/login', (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(function (user) {
        if (!user) {
            // res.redirect('/login'); //hmm
            res.json({message: 'no'})
        } else {
            bcrypt.compare(req.body.password, user.password, function (err, result) {
                if (result == true) {
                    console.log('true')
                    res.redirect('/')
                } else {
                    res.send('Incorrect Password')
                }
                if (err) {
                    console.log(err)
                }
            })
        }
    })
});

module.exports = router
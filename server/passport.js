const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose"); //idk if this is needed either. seems it would be needed for line below. also from ubiqum instructions 
// const User = mongoose.model("user"); // commented bc its from ubiqum instructions and i think its wrong
const User = require('./models/User');
const passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;

const key = require('./config/keys');

//JWT Strategy Options
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey= key.secretOrKey;

//Google Strategy Options
const googleOpts = {};
googleOpts.clientID = key.clientId
googleOpts.clientSecret = key.clientSecret
googleOpts.callbackURL = "/api/users/google/redirect"

//serialize
passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user)
  })
})

//exporting strategies
module.exports = {
  jwtStrat: passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
        User.findById(jwt_payload.id)
        .then(user => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  ),

  //google sign in Strategy
  googleStrat: passport.use(
    new GoogleStrategy(googleOpts, (accessToken, refreshToken, profile, email, done) => {
      User.findOne({googleId: email.id})
      .then((user) => {
        if (user) {
           console.log('found user')
          //if use is already there, return user
          return done(null, user)
          //if user has not bee there before, save new user
        } else {
          console.log('did not find user')
          const newUser = new User({
            googleId: email.id,
            profPicUrl: email._json.picture,
            displayName: email.displayName,
            email: email._json.email
        });
        newUser.save().then(user => {
                console.log(user)
            }).then(user => {return done(null, user)})
            .catch(err => console.log(err));
        }
      })
    })
  ),

//end of export
} 
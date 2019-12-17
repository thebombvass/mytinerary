const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose"); //idk if this is needed either. seems it would be needed for line below. also from ubiqum instructions 
// const User = mongoose.model("user"); // commented bc its from ubiqum instructions and i think its wrong
const User = require('./models/User');

const key = require('./config/keys');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey= key.secretOrKey;

//youre getting an error that passport isnt defined. idk
module.exports = passport.use(
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
  );
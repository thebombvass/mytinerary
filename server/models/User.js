const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema ({
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    profPicUrl: {
        type: String,
    },
    googleId: {
        type: String,
    }, 
    displayName: {
        type: String,
    }
})

module.exports = User = mongoose.model('user', UserSchema);
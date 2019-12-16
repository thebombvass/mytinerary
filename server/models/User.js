const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema ({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    profPicUrl: {
        type: String,
    },
})

//name of module is the singular version (city) of the database name (cities)
module.exports = User = mongoose.model('user', UserSchema);
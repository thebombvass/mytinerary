const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CitySchema = new Schema ({
    name: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
    },
    itinerariesUrl: {
        type: String,
    }
})

//name of module is the singular version (city) of the database name (cities)
module.exports = City = mongoose.model('city', CitySchema);
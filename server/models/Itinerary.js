const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItinerarySchema = new Schema ({
    title: {
        type: String,
        required: true,
    },
    profPicUrl: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
    },
    duration: {
        type: String,
    },
    price: {
        type: String,
    },
    cityName: {
        type: String,
        required: true,
    }
})

//name of module is the singular version (city) of the database name (cities)
module.exports = Itinerary = mongoose.model('itinerary', ItinerarySchema);
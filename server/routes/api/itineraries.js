const express = require('express')
const router = express.Router()

//Itinerary Model 
const Itinerary = require('../../models/Itinerary');
//City Model 
const City = require('../../models/City');

// @route   GET api/itineraries
// @desc    get all itineraries
// @access  public
router.get('/', (req, res) => {
    Itinerary.find()
        .then(itineraries => res.json(itineraries))
        .catch(err => console.log(err))
});

// @route   GET api/itineraries/:name
// @desc    get itineraries for a specific city
// @access  public
router.get('/:name', (req, res) => {
  		let cityRequested = req.params.name;
  		Itinerary.find({ cityName: cityRequested })
			.then(itineraries => {
				res.send(itineraries)
			})
			.catch(err => console.log(err));
});

// @route   POST api/itineraries
// @desc    create an itineraries
// @access  public
router.post('/', (req, res) => {
    const newItinerary = new Itinerary({
        title: req.body.title,
        profPicUrl: req.body.profPicUrl,
        rating: req.body.rating,
        duration: req.body.duration,
        price: req.body.price,
        cityName: req.body.cityName,
    });
    newItinerary.save()
        .then(itinerary => res.json(itinerary))
        .catch(err => console.log(err));
});

module.exports = router
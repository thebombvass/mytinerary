const express = require('express')
const router = express.Router()

//City Model 
const City = require('../../models/City');

// @route   GET api/cities
// @desc    get all cities
// @access  public
router.get('/', (req, res) => {
    City.find()
        .then(cities => res.json(cities))
        .catch(err => console.log(err))
});

// @route   POST api/cities
// @desc    create an cities
// @access  public
router.post('/', (req, res) => {
    const newCity = new City({
        name: req.body.name,
        country: req.body.country,
    });
    newCity.save().then(city => res.json(city))
        .catch(err => console.log(err));
});

module.exports = router
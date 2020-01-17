//imports
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('./passport')

//import routes
const items = require('./routes/api/items');
const cities = require('./routes/api/cities');
const itineraries = require('./routes/api/itineraries')
const users = require('./routes/api/users')
// const auth = require('./routes/api/auth')



//app defined
const app = express();

// Bodyparser Middleware
app.use(bodyParser.json());
app.use(cors());

//Keys Config 
const db = require('./config/keys.js').mongoURI;

//Connect to Mondo
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=> console.log('MongoDB Connected...'))
  .catch(err => console.log(err));
  
mongoose.Promise = global.Promise;

//passport middleware
app.use(passport.jwtStrat.initialize());
app.use(passport.googleStrat.initialize());

// Use routes
app.use('/api/items', items);
app.use('/api/cities', cities);
app.use('/api/itineraries', itineraries);
// app.use('/api/users/login', users); pretty sure you don't need this. lets see
app.use('/api/users', users);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));

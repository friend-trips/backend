require('dotenv').config();
const express = require('express');
const app = express();
const db = require('./database/index.js');
const PORT = process.env.PORT || 4001;
const cors = require('cors');
app.use(cors());

const tripsRoute = require('./routes/trips.js');
const usersRoute = require('./routes/users.js');
const messagesRoute = require('./routes/messages.js');
const commentsRoute = require('./routes/comments.js');
const authRoute = require('./routes/auth.js');

const flightsRoute = require('./routes/flights.js');
const hotelsRoute = require('./routes/hotels.js');
const poisRoute = require('./routes/pois.js');
const votesRoute = require('./routes/votes.js');
const itineraryRoute = require('./routes/itinerary.js');
const amadeusRoute = require('./routes/amadeus.js');
const mapboxRoute = require('./routes/mapbox.js');

// const savedEventsRoute = require('./routes/saved_events.js');

app.use(express.json());
app.use((req, res, next) => {
  console.log(`A ${req.method} for ${req.originalUrl}`);
  next();
});

app.use('/trips', tripsRoute);
app.use('/users', usersRoute);
app.use('/messages', messagesRoute);
app.use('/comments', commentsRoute);
app.use('/auth', authRoute);
app.use('/flights', flightsRoute);
app.use('/hotels', hotelsRoute);
app.use('/pois', poisRoute);
app.use('/api/votes', votesRoute);
app.use('/api/itinerary', itineraryRoute);
app.use('/api/amadeus', amadeusRoute);
app.use('/api/mapbox', mapboxRoute);

app.get('/', (req, res) => {
  res.status(200).send('Hello friend!');
});

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});

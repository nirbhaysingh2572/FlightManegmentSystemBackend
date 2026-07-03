const express = require('express');

const UserRoutes = require('./user-routes');
const FlightRoutes = require('./flight-routs');
const CityRoutes = require('./city-routs.js');
const AirplaneRouter = require('./airplane-routs.js');
const AirportRouter = require('./airport-routs.js');
const BooingRoutes = require('./booking-routs.js');

const router = express.Router();

//Auth service routes
router.use('/user', UserRoutes);

// flightSearchServic routes
router.use('/flight', FlightRoutes);
router.use('/city', CityRoutes);
router.use('/airplane', AirplaneRouter);
router.use('/airport', AirportRouter);

// bookingService  routes
router.use('/booking',BooingRoutes)




module.exports = router;


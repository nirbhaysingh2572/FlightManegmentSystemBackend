const express = require('express');

const UserRoutes = require('./user-routes');
const FlightRoutes = require('./flight-routs');

const router = express.Router();

//Auth service routes
router.use('/user', UserRoutes);

// flightSearchServic routes
router.use('/flight', FlightRoutes);


module.exports = router;


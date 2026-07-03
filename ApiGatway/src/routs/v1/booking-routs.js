const express = require('express');

const { BookingServiceProxy } = require('../../utils/proxy.js');
const { isAuthenticated } = require('../../middelwares/auth-middelware.js');

const router = express.Router();

/**
 *   booking shoud be created only by authenticate user 
 *      ->after authenticate i just push there user id to req body so it help to create booking
 *   user can get there booking only 
 *      -> either one or all of bookings 
 */

/*
 *  list of all user routes
 *
 *       routs                  method              allowed to do                           explanation
 *  1. '/'                      post                   authenticate user                    createbooking
 *  2. '/:id'                   get                authenticate user there only             get a booking
 *  3. '/'                      get                authenticate user there only             get all bookings
 *  
 *  
 */


// create a booking only authenticated user
router.post('/',
    isAuthenticated,
    BookingServiceProxy
);

// get a booking  by a authenticated user there only
router.get('/:id', 
    isAuthenticated,
    BookingServiceProxy
);

// get all booking  by a authenticated user there only
router.get('/', 
    isAuthenticated,
    BookingServiceProxy
);



module.exports = router;


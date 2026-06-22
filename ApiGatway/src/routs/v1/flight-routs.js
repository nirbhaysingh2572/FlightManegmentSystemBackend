const express = require('express');

const { FlightSearchServiceProxy } = require('../../utils/proxy.js');
const { isAdmin  } = require('../../middelwares/auth-middelware.js')

const router = express.Router();



/*
 *  list of all user routes
 *
 *       routs                  method              allowed to do                           explanation
 *  1. '/'                      post                   admin                                createflight
 *  2. '/:id'                   post                   admin                                update flight
 *  3. '/:id'                   get                    any one                              get a flitht
 *  4. '/'                      get                    anyone                              get all flight
 *  5. '/:id'                   delete                 Admin only                           delete a file
 *  
 *  
 */


//create flight rout allow only to admin
router.post('/', 
    isAdmin,
    FlightSearchServiceProxy
);

// update flight rout allow only admin 
router.patch('/:id',
    isAdmin,
    FlightSearchServiceProxy
);

// delete flight route allow only adim
router.delete('/:id',
    isAdmin,
    FlightSearchServiceProxy
);

// get flight rout allow to all
router.get('/:id', 
    FlightSearchServiceProxy
);

// get flight rout allow to all
router.get('/', 
    FlightSearchServiceProxy
);



module.exports = router;


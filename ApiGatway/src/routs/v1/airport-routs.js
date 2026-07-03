const express = require('express');

const { FlightSearchServiceProxy } = require('../../utils/proxy.js');
const { isAuthenticated, isAdmin  } = require('../../middelwares/auth-middelware.js')

const router = express.Router();



/*
 *  list of all airport routes
 *
 *       routs                  method              allowed to do                           explanation
 *  1. '/'                      post                   admin                                create a airport
 *  2. '/:id'                   post                   admin                                update a airport
 *  3. '/:id'                   get                    any one                              get a airport
 *  4. '/'                      get                    anyone                              get all airport
 *  5. '/:id'                   delete                 Admin only                           delete a airport
 *  
 *  
 */




//create airport rout allow only to admin
router.post('/', 
    isAuthenticated,
    isAdmin,
    FlightSearchServiceProxy
);

// update airport rout allow only admin 
router.patch('/:id',
    isAuthenticated,
    isAdmin,
    FlightSearchServiceProxy
);

// delete airport route allow only adim
router.delete('/:id',
    isAuthenticated,
    isAdmin,
    FlightSearchServiceProxy
);

// get airport rout allow to all
router.get('/:id', 
    FlightSearchServiceProxy
);

// get airport rout allow to all
router.get('/', 
    FlightSearchServiceProxy
);



module.exports = router;


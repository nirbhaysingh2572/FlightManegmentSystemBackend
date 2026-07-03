const express = require('express');

const { FlightSearchServiceProxy } = require('../../utils/proxy.js');
const { isAuthenticated, isAdmin  } = require('../../middelwares/auth-middelware.js')

const router = express.Router();



/*
 *  list of all airplane routes
 *
 *       routs                  method              allowed to do                           explanation
 *  1. '/'                      post                   admin                                create a airplane
 *  2. '/:id'                   post                   admin                                update a airplane
 *  3. '/:id'                   get                    any one                              get a airplane
 *  4. '/'                      get                    anyone                              get all airplane
 *  5. '/:id'                   delete                 Admin only                           delete a airplane
 *  
 *  
 */




//create airplane rout allow only to admin
router.post('/', 
    isAuthenticated,
    isAdmin,
    FlightSearchServiceProxy
);

// update airplane rout allow only admin 
router.patch('/:id',
    isAuthenticated,
    isAdmin,
    FlightSearchServiceProxy
);

// delete airplane route allow only adim
router.delete('/:id',
    isAuthenticated,
    isAdmin,
    FlightSearchServiceProxy
);

// get airplane rout allow only to admin
router.get('/:id', 
    isAuthenticated,
    isAdmin,
    FlightSearchServiceProxy
);

// get airplane rout allow only to admin
router.get('/', 
    isAuthenticated,
    isAdmin,
    FlightSearchServiceProxy
);



module.exports = router;

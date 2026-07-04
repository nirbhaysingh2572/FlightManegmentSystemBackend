const express = require('express');

const { AirportControler } = require('../../controler/index');
const { AirportMiddeleware } = require('../../middelwares/index')

const router = express.Router();

router.post('/', 
    AirportMiddeleware.validateCreateAirport,
    AirportControler.create
);

router.patch('/:id', 
    AirportMiddeleware.validateUpdateAirport,
    AirportControler.update
);

router.delete('/:id', AirportControler.destroy);
router.get('/:id', AirportControler.get);
router.get('/', AirportControler.getAll);


module.exports = router;


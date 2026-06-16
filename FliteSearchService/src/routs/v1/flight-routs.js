const express = require('express');

const { FlightControler } = require('../../controler/index');
const  { FlightMiddleware }  = require('../../middelwares/index');

const router = express.Router();

router.post('/', 
    FlightMiddleware.createFlightValidator,
    FlightControler.create
);

router.patch('/:id', FlightControler.update);
router.delete('/:id', FlightControler.destroy);
router.get('/:id', FlightControler.get);
router.get('/', FlightControler.getAll);

module.exports = router;

const express = require('express');

const { AirplaneControler }= require('../../controler/index');
const { AirplaneMiddleware } = require('../../middelwares/index')

const router = express.Router();

router.post('/',
    AirplaneMiddleware.validateCreateAirplane,
    AirplaneControler.create
);

router.patch('/:id',
    AirplaneMiddleware.validateUpdateAirplane, 
    AirplaneControler.update
);

router.delete('/:id', AirplaneControler.destroy);
router.get('/:id', AirplaneControler.get);
router.get('/', AirplaneControler.getAll);


module.exports = router;
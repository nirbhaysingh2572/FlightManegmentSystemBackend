const express = require('express');

const { AirplaneControler }= require('../../controler/index');

const router = express.Router();

router.post('/', AirplaneControler.create);
router.patch('/:id', AirplaneControler.update);
router.delete('/:id', AirplaneControler.destroy);
router.get('/:id', AirplaneControler.get);
router.get('/', AirplaneControler.getAll);


module.exports = router;
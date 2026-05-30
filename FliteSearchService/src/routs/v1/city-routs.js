const express = require('express');

const { CityControler } = require('../../controler/index.js');

const router = express.Router();


router.post('/', CityControler.create);
router.patch('/:id', CityControler.update);
router.delete('/:id', CityControler.destroy);
router.get('/:id', CityControler.get);
router.get('/', CityControler.getAll);

module.exports = router;
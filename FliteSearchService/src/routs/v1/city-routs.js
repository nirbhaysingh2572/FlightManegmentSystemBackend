const express = require('express');

const { CityControler } = require('../../controler/index.js');

const router = express.Router();


router.post('/', CityControler.create);
router.patch('/', CityControler.update);
router.delete('/', CityControler.destroy);
router.get('/', CityControler.get);

module.exports = router;
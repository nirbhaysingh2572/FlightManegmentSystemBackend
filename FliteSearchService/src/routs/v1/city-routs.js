const express = require('express');
const router = express.Router();

const { CityControler } = require('../../controler/index.js');


router.post('/', CityControler.create);
router.patch('/', CityControler.update);
router.delete('/', CityControler.destroy);
router.get('/', CityControler.get);

module.exports = router;
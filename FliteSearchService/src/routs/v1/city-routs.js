const express = require('express');

const { CityControler } = require('../../controler/index.js');
const { CityMiddleware } = require('../../middelwares/index.js');

const router = express.Router();


router.post('/', 
    CityMiddleware.validateCreateCity,
    CityControler.create
);

router.patch('/:id',
    CityMiddleware.validateUpdateCity,
    CityControler.update
);

router.delete('/:id', CityControler.destroy);
router.get('/:id', CityControler.get);
router.get('/', CityControler.getAll);

module.exports = router;
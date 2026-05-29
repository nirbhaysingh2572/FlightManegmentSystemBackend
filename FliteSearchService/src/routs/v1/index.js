const express = require('express');
const router = express.Router();

const cityRoutes = require('./city-routs.js');
const airplaneRouter = require('./airplane-routs.js');


// const { CityControler } = require('../../controler/index.js');

router.use('/city', cityRoutes);
router.use('/airplane', airplaneRouter);

// router.post('/city', CityControler.create);
// router.patch('/city', CityControler.update);
// router.delete('/city', CityControler.destroy);
// router.get('/city', CityControler.get);



module.exports = router;

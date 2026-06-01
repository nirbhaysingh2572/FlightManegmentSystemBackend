const express = require('express');

const UserRoutes = require('./user-routes');

const router = express.Router();

router.use('/user', UserRoutes);

module.exports = router;
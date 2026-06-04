const express = require('express');

const { UserControler } = require('../../controlers/index');
const { UserMiddelware } = require('../../middelwares/index');


const router = express.Router();

router.post('/', UserMiddelware.createUserValidator, UserControler.create);
router.delete('/:id', UserControler.destroy);

module.exports = router;
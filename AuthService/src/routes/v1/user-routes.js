const express = require('express');

const { UserControler } = require('../../controlers/index');


const router = express.Router();

router.post('/', UserControler.create);
router.delete('/:id', UserControler.destroy);

module.exports = router;
const express = require('express');

const { UserControler } = require('../../controlers/index');
const { UserMiddelware } = require('../../middelwares/index');


const router = express.Router();

router.post('/signup', 
    UserMiddelware.createUserValidator, 
    UserControler.create
);

router.post('/signin',
    UserMiddelware.signUserValidator,
    UserControler.signin
);

router.post('/addRole',
    UserControler.addRole
)

router.get('/:id',
    UserControler.get
)

router.get('/isAuthenticated',
    UserControler.isAuthenticated
);

router.get('/isAdmin/:id',
    UserControler.isAdmin
);

router.delete('/:id',
    UserControler.destroy
);


module.exports = router;
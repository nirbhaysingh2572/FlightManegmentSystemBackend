const express = require('express');

const { UserControler } = require('../../controlers/index');
const { UserMiddelware } = require('../../middelwares/index');


const router = express.Router();

router.post('/signup', 
    UserMiddelware.signupUserValidator, 
    UserControler.create
);

router.post('/signin',
    UserMiddelware.signinUserValidator,
    UserControler.signin
);

router.post('/addRole',
    UserControler.addRole
)

router.get('/isAuthenticated',
    UserMiddelware.validateisAuthenticated,
    UserControler.isAuthenticated
);

router.get('/:id',
    UserControler.get
)

router.get('/isAdmin/:id',
    UserControler.isAdmin
);

router.delete('/:id',
    UserControler.destroy
);


module.exports = router;
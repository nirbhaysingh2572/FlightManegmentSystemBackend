const express = require('express');
const bodyParser = require('body-parser');


const { PORT, DB_SYNC } =  require('./config/serverConfig.js');
const ApiRoutes = require('./routs/index.js');



const setupAndStartServer = async () => {

    // create the express object
    const app = express();

    //setup body parser
    app.use(bodyParser.urlencoded());
    app.use(bodyParser.json());

    app.use('/api', ApiRoutes);
    
    app.listen(PORT, async () => {
        console.log(`Server started at ${PORT}`);
        // far sync database 
        if(DB_SYNC){
            db.sequelize.sync();
        }
    });
}

setupAndStartServer();


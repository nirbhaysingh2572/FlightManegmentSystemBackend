const express = require('express');
const bodyParser = require('body-parser');


const { PORT } =  require('./config/serverConfig.js');


const setupAndStartServer = async () => {

    // create the express object
    const app = express();

    //setup body parser
    app.use(bodyParser.urlencoded());
    app.use(bodyParser.json());
    
    app.listen(PORT, () => {
        console.log(`Server started at ${PORT}`);
    });
}

setupAndStartServer();
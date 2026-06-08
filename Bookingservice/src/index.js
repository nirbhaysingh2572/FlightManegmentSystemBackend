const express = require('express');
const bodyParser = require('body-parser');

const { PORT } = require('./config/server-config');

function serverRun(){

    const app = express();

    // setup body-parser
    app.use(bodyParser.urlencoded);
    app.use(bodyParser.json);


    app.listen(PORT,()=>{
        console.log(`server Runing at ${PORT}`);

    });



}

serverRun()
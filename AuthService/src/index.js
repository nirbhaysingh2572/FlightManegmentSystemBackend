const express = require('express');
const bodyParser = require('body-parser');


const { PORT } = require('./config/server-config');


const serverStart = async ()=>{

    //insilizing express object
    const app = express();

    // seting up body-parser
    app.use(bodyParser.urlencoded())
    app.use(bodyParser.json());

    // start server
    app.listen(PORT, ()=>{
        console.log(`server Started at ${PORT}`);
    });

};

serverStart();


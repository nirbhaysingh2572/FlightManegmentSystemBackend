const express = require('express');
const bodyParser = require('body-parser');

const { PORT } = require('./config/server-config');
const  ApiRoutes  = require('./routes/index');



function serverRun(){

    const app = express();

    // setup body-parser
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));

    app.use('/api', ApiRoutes);

    app.listen(PORT,()=>{
        console.log(`server Runing at ${PORT}`);

    });



}

serverRun();
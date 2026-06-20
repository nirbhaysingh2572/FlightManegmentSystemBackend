const express = require('express');

const { PORT } = require('./config/server-config.js')

async function setuptAndRunServer(){

    const app = express();

    app.listen(PORT, async ()=>{

        console.log(`server started at : ${PORT}`);
    });

}   

setuptAndRunServer();
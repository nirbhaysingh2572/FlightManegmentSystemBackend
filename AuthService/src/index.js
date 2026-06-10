const express = require('express');
const bodyParser = require('body-parser');


const ApiRoutes = require('./routes/index');
const db = require('./models/index');
const { PORT, DB_SYNC } = require('./config/server-config');


const serverStart = async ()=>{

    //insilizing express object
    const app = express();

    // seting up body-parser
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}))


    app.use('/api', ApiRoutes);

    // start server
    app.listen(PORT, ()=>{
        console.log(`server Started at ${PORT}`);

        if(DB_SYNC){
            db.sequelize.sync({ alter:true });
        }

    });

};

serverStart();


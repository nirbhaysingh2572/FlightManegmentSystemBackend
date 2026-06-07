const dotenv = require('dotenv');

dotenv.config();



module.exports = {
    PORT:process.env.PORT,
    saltRound: Number(process.env.saltRound),
    JWT_KEY: process.env.JWT_KEY,
    DB_SYNC: process.env.DB_SYNC
}
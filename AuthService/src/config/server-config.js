const dotenv = require('dotenv');

dotenv.config();



module.exports = {
    PORT:process.env.PORT,
    saltRound: Number(process.env.saltRound)
}
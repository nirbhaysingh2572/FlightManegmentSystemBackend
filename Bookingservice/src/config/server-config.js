const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    PORT: process.env.PORT,
    AMPQ_URL: process.env.AMPQ_URL,
    FLIGHT_SERVICE_PATH: process.env.FLIGHT_SERVICE_PATH,
    USER_SERVICE_PATH: process.env.USER_SERVICE_PATH,

}
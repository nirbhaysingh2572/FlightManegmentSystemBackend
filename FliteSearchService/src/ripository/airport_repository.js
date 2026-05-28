const { Airport } = require('../models/index');
const Repository = require('./crud_ripository.js');


class AirportRipository extends Repository {
    constructor(){
        super(Airport);
    }
}

module.exports = AirportRipository;
const { Flight } = require('../models/index');
const Repository = require('./crud_ripository.js');


class FlightRipository extends Repository {
    constructor(){
        super(Flight);
    }
}

module.exports = FlightRipository;
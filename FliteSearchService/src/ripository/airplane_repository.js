const { Airplane } = require('../models/index');
const Repository = require('./crud_ripository.js');


class AirplaneRipository extends Repository {
    constructor(){
        super(Airplane);
    }
}

module.exports = AirplaneRipository;
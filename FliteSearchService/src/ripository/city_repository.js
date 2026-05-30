const { City } = require('../models/index.js');
const Repository = require('./crud_ripository.js');

class CityRepository extends Repository{
    constructor(){
        super(City);
    }
    
}

module.exports = CityRepository;
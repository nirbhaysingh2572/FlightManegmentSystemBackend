const { CityRepository } = require('../ripository/index');
const Service = require('./crud_service');


const cityRepository = new CityRepository();

class CityService extends Service{
    constructor(){
        super(cityRepository);
    }

}


module.exports = CityService;

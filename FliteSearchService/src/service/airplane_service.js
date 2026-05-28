const { AirplaneRepository } = require('../ripository/index');
const Service = require('./crud_service');

const airplaneRepository = new AirplaneRepository();

class AirplaneService extends Service {
    constructor(){
        super(airplaneRepository);
    }
}

module.exports = AirplaneService;
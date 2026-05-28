const { AirportRepository } = require('../ripository/index');
const Service = require('./crud_service');

const airportRepository = new AirportRepository();

class AirportService extends Service {
    constructor(){
        super(airportRepository);
    }
}

module.exports = AirportService;
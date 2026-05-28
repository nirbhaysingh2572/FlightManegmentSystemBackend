const { FlightRepository } = require('../ripository/index');
const Service = require('./crud_service');

const flightRepository = new FlightRepository();

class FlightService extends Service {
    constructor(){
        super(flightRepository);
    }
}

module.exports = FlightService;
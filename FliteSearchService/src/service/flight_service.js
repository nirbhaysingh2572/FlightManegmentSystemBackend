
const { FlightRepository,AirplaneRepository } = require('../ripository/index');
const Service = require('./crud_service');
const { ServiceError } = require('../utils/errors/index');

const flightRepository = new FlightRepository();
const airplaneRepository = new AirplaneRepository();

class FlightService extends Service {
    constructor(){
        super(flightRepository);
    }

    // overwrite create function
    async create(data){
        try{
            // get flight from flight repo
            const airplane = await airplaneRepository.find(data.airplaneId);
            data.availbleSeats = airplane.capacity;
            const flight = await flightRepository.create(data);
            return flight;
        }
        catch(error){
            if(error.name == "AppError" ||
                error.name == "ValidationError"
            )
                throw(error);

            console.log("some Error in service layer !");
            throw(new ServiceError());
        }
    };
}

module.exports = FlightService;
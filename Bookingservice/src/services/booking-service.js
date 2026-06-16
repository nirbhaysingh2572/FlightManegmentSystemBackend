const axios = require('axios');

const { BookingRepository } = require('../repository/index');
const { ServiceError, ValidationError } = require('../utils/errors/index');

const FLIGHT_SERVICE_PATH = "http://localhost:3000/api/v1";
const USER_SERVICE_PATH = "http://localhost:3001/api/v1";


const bookingRepository = new BookingRepository();

class BookingService{

    async create(data){
        try{
            //get user and flight 
            const GET_USER_URL =  USER_SERVICE_PATH + `/user/${data.userId}`;
            const GET_FLIGHT_URL = FLIGHT_SERVICE_PATH + `/flight/${data.flightId}`;
            const user = await axios.get(GET_USER_URL);
            const flight = await axios.get(GET_FLIGHT_URL);
            //check does flight have that much sheats or not
            const availbleSeats = flight.data.data.availbleSeats;
            if(availbleSeats<data.seats){
                throw(
                    new ValidationError({
                        message:"seats unavalble !",
                        explanation: `${availbleSeats} seats availble only for Now !`
                    })
                )
            }
            // now create the booking
            const booking = await bookingRepository.create(data);
            // after you have to add payment gateway and make booking successfuly and cancel acc..
            return booking;
        }
        catch(error){
            if(error.name == 'AppError'||
                error.name == 'ValidationError'
            )
                throw(error);
            if(error.isAxiosError){
                // its get bad response from server
                if(error.response){
                    throw(new ValidationError({
                        message: error.response.data.message,
                        explanation: error.response.data.error,
                        statusCode: error.response.status
                    }));
                }
                // if not get response then it shuoud be connection error
                console.log("anable to connect with other service !");
            }
            console.log(error);
            console.log("some error in service Layer");
            throw(
                new ServiceError()
            );
        }
    }

    


}


module.exports = BookingService;
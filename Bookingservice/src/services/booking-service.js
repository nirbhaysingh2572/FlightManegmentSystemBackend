const { BookingRepository } = require('../repository/index');
const { ServiceError } = require('../utils/errors/index');


const bookingRepository = new BookingRepository();

class BookingService{

    async create(data){
        try{
            return "booking";
        }
        catch(error){
            if(error == 'AppError')
                throw(error);

            console.log("some error in service Layer");
            throw(
                new ServiceError()
            );
        }
    }

    


}


module.exports = BookingService;
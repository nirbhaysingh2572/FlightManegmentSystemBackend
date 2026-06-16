
const { ValidationError } = require('../utils/errors/index');
const { compareTime,isValidTimestamp } = require('../utils/helper');

createFlightValidator = async (req,res,next) => {
    try{
        if(!req.body || 
            !req.body.flightNumber ||
            !req.body.arrivalAirportId ||
            !req.body.departureAirportId ||
            !req.body.arrivalTime ||
            !req.body.departureTime || 
            !req.body.airplaneId 
        ){
            throw(
                new ValidationError({
                    message:"Missing Atribute !",
                    explanation: "missing midotary proprety to create flight !"
                })
            );
        }

        if(!compareTime(req.body.arrivalTime,req.body.departureTime)){
            throw(
                new ValidationError({
                    message:"Invlid Time!",
                    explanation: "arrivalTime should be greater Than departure Time !"
                })
            );
        }

        next();
    }
    catch(error){

        return res.status(error.statusCode).json({
            data:{},
            success: false,
            message: error.message,
            error: error.explanation
        });
    }
};


module.exports = {
    createFlightValidator,

}

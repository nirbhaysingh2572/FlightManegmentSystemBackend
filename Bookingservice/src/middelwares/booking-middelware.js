const { StatusCodes } = require('http-status-codes');

const { ValidationError } = require('../utils/errors/index');


validateCreateBooking = (req,res, next) => {
    try{
        if(!req.body||
            !req.body.userId ||
            !req.body.flightId ||
            !req.body.seats
        ){
            throw(new ValidationError({
                message: "missing required attribute !",
                explanation: "you must have to send valid atributes {userId,flight,seats,price} !"
            }));
        }
    }
    catch(error){
        return res.status(error.statusCode).json({
                data: {},
                success: false,
                message: error.message,
                error: error.explanation
        });
    }
    next();
};



module.exports = {
    validateCreateBooking,

}
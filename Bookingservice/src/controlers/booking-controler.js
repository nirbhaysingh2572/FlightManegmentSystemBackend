const { StatusCodes } = require('http-status-codes');

const { BookingService }  = require('../services/index');

const bookingService = new BookingService();

create = async (req, res) =>{
    try{
        const result = 5;
        return res.status(StatusCodes.CREATED).json({
            data: result,
            success: true,
            message: "booking created succuessfully !"
        });
    }
    catch(error){
        return res.status(error.statusCode).json({
            data: {},
            success: false,
            message: error.message,
            error: error
        });
    }
};


module.exports = {
    create,
    
}
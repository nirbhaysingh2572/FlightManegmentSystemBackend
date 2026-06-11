const { StatusCodes } = require('http-status-codes');

const { BookingService }  = require('../services/index');

const bookingService = new BookingService();

create = async (req, res) =>{
    try{
        //destructure the data before sending furthur
        const data = {
            userId: req.body.userId,
            flightId: req.body.flightId,
            seats: req.body.seats
        }
        const result = await bookingService.create(data);
        return res.status(StatusCodes.CREATED).json({
            data: result,
            success: true,
            message: "booking created succuessfully !"
        });
    }
    catch(error){
        return res.status(400).json({
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
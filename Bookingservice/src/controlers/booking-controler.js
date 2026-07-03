const { StatusCodes } = require('http-status-codes');

const { BookingService }  = require('../services/index');

const bookingService = new BookingService();

create = async (req, res) =>{
    try{
        //destructure the data before sending furthur
        const data = {
            userId: req.headers['x-user-id'],
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

get = async (req, res) =>{
    try{
        const result = await bookingService.get(req.params.id);
        return res.status(StatusCodes.OK).json({
            data: result,
            status: true,
            message: "sucessfully fech a booking !",
            error: {}
        });
    }
    catch(error){
        return res.status(error.statusCode).json({
            data: {},
            status: false,
            message: error.message,
            error: error.explanation
        });
    }
}

getAll = async (req, res) =>{
     try{
        const result = await bookingService.getall(req.params.id);
        return res.status(StatusCodes.OK).json({
            data: result,
            status: true,
            message: "sucessfully feched all bookings !",
            error: {}
        });
    }
    catch(error){
        return res.status(error.statusCode).json({
            data: {},
            status: false,
            message: error.message,
            error: error.explanation
        });
    }
}

module.exports = {
    create,
    get,
    getAll,

}
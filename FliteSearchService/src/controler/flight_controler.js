const { StatusCodes } = require('http-status-codes');

const { FlightService }= require('../service/index.js');


const flightService = new FlightService();
 
create = async (req,res) => {
    try{
        const data = {
            flightNumber: req.body.flightNumber,
            arrivalAirportId: req.body.arrivalAirportId,
            departureAirportId: req.body.departureAirportId,
            arrivalTime: req.body.arrivalTime,
            departureTime: req.body.departureTime,
            airplaneId: req.body.airplaneId
        };
        const flight = await flightService.create(data);
        return res.status(StatusCodes.CREATED).json({
            data : flight,
            succses : true,
            massage : "succsesfully created flight",
            err :{}
        })
    }
    catch(error){
        return res.status(error.statusCode).json({
            data : {},
            succses : false,
            massage : error.message,
            error :error.explation
        })
    }
} 

update = async (req,res) => {
    try{
        const data = {
            flightNumber: req.body.flightNumber,
            arrivalAirportId: req.body.arrivalAirportId,
            departureAirportId: req.body.departureAirportId,
            arrivalTime: req.body.arrivalTime,
            departureTime: req.body.departureTime,
            airplaneId: req.body.airplaneId
        };
        const flight = await flightService.update(req.params.id, data);
        return res.status(StatusCodes.OK).json({
            data : flight,
            succses : true,
            massage : "succsesfully updated flight",
            err :{}
        })
    }
    catch(error){
        return res.status(error.statusCode).json({
            data : {},
            succses : false,
            massage : error.message,
            error :error.explation
        })
    }
} 

destroy = async (req,res) => {
    try{
        const response = await flightService.delete(req.params.id);
        return res.status(StatusCodes.OK).json({
            data : response,
            succses : true,
            massage : "succsesfully delete flight",
            err :{}
        })
    }
    catch(error){
        return res.status(error.statusCode).json({
            data : {},
            succses : false,
            massage : error.message,
            error :error.explation
        })
    }
} 

get = async (req,res) => {
    try{
        const flight = await flightService.find(req.params.id);
        return res.status(StatusCodes.OK).json({
            data : flight,
            succses : true,
            massage : "succsesfully fetched flight",
            err :{}
        })
    }
    catch(error){
        return res.status(error.statusCode).json({
            data : {},
            succses : false,
            massage : error.message,
            error :error.explation
        })
    }

}

getAll = async (req,res) => {
    try{
        const result = await flightService.getAll({});
        return res.status(StatusCodes.OK).json({
            data : result,
            succses : true,
            massage : "succsesfully fetched flight",
            err :{}
        })
    }
    catch(error){
        return res.status(error.statusCode).json({
            data : {},
            succses : false,
            massage : error.message,
            error :error.explation
        })
    }
}


module.exports = {
    create,
    update,
    destroy,
    get,
    getAll
}
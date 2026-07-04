const { StatusCodes } = require('http-status-codes');

const { AirportService }= require('../service/index.js');


const airportService = new AirportService();
 
create = async (req,res) => {
    try{
        const data = {
            name: req.body.name,
            address: req.body.address,
            cityId: req.body.cityId
        }
        const airport = await airportService.create(data);
        return res.status(StatusCodes.CREATED).json({
            data : airport,
            succses : true,
            massage : "succsesfully created airport",
            err :{}
        })
    }
    catch(error){
        return res.status(error.statusCode).json({
            data : {},
            succses : false,
            message : error.message,
            error: error.explanation
        })
    }
} 

update = async (req,res) => {
    try{
        const data = {
            name: req.body.name,
            address: req.body.address,
            cityId: req.body.cityId
        }
        const airport = await airportService.update(req.params.id, data);
        return res.status(StatusCodes.OK).json({
            data : airport,
            succses : true,
            massage : "succsesfully updated airport",
            err :{}
        })
    }
    catch(error){
        return res.status(error.statusCode).json({
            data : {},
            succses : false,
            message : error.message,
            error: error.explanation
        })
    }
} 

destroy = async (req,res) => {
    try{
        const response = await airportService.delete(req.params.id);
        return res.status(StatusCodes.OK).json({
            data : response,
            succses : true,
            massage : "succsesfully delete airport",
            err :{}
        })
    }
    catch(error){
        return res.status(error.statusCode).json({
            data : {},
            succses : false,
            message : error.message,
            error: error.explanation
        })
    }
} 

get = async (req,res) => {
    try{
        const airport = await airportService.find(req.params.id);
        return res.status(StatusCodes.OK).json({
            data : airport,
            succses : true,
            massage : "succsesfully fetched airport",
            err :{}
        })
    }
    catch(error){
        return res.status(error.statusCode).json({
            data : {},
            succses : false,
            message : error.message,
            error: error.explanation
        })
    }

}

getAll = async (req,res) => {
    try{
        const result = await airportService.getAll({});
        return res.status(StatusCodes.OK).json({
            data : result,
            succses : true,
            massage : "succsesfully fetched airports !",
            err :{}
        })
    }
    catch(error){
        return res.status(error.statusCode).json({
            data : {},
            succses : false,
            message : error.message,
            error: error.explanation
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
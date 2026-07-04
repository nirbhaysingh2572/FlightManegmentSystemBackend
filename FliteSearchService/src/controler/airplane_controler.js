const { StatusCodes } = require('http-status-codes');

const { AirplaneService }= require('../service/index.js');


const airplaneService = new AirplaneService();
 
create = async (req,res) => {
    try{
        const data = {
            modelNo: req.body.modelNo,
            capacity: req.body.capacity
        }
        const airplane = await airplaneService.create(data);
        return res.status(StatusCodes.CREATED).json({
            data : airplane,
            succses : true,
            massage : "succsesfully created airplane",
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
            modelNo: req.body.modelNo,
            capacity: req.body.capacity
        }
        const airplane = await airplaneService.update(req.params.id, data);
        return res.status(StatusCodes.OK).json({
            data : airplane,
            succses : true,
            massage : "succsesfully updated airplane",
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
        const response = await airplaneService.delete(req.params.id);
        return res.status(StatusCodes.OK).json({
            data : response,
            succses : true,
            massage : "succsesfully delete airplane",
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
        const airplane = await airplaneService.find(req.params.id);
        return res.status(StatusCodes.OK).json({
            data : airplane,
            succses : true,
            massage : "succsesfully fetched airplane",
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
        const result = await airplaneService.getAll({});
        return res.status(201).json({
            data : result,
            succses : true,
            massage : "succsesfully fetched airplane",
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
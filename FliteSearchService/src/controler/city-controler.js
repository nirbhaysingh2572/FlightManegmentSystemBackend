const { StatusCodes } = require('http-status-codes');

const { CityService }= require('../service/index.js');


const cityService = new CityService();
 
create = async (req,res) => {
    try{
        const data = {
            name:req.body.name
        }
        const city = await cityService.create(data);
        return res.status(StatusCodes.CREATED).json({
            data : city,
            succses : true,
            massage : "succsesfully created city",
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
            name:req.body.name
        }
        const city = await cityService.update(req.params.id, data);
        return res.status(StatusCodes.OK).json({
            data : city,
            succses : true,
            massage : "succsesfully updated city",
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
        const response = await cityService.delete(req.params.id);
        return res.status(StatusCodes.OK).json({
            data : response,
            succses : true,
            massage : "succsesfully delete city",
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
        const city = await cityService.get(req.parans.id);
        return res.status(StatusCodes.OK).json({
            data : city,
            succses : true,
            massage : "succsesfully fetched city",
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

getAll = async (req,res) =>{
    try{
        const city = await cityService.getAll({});
        return res.status(StatusCodes.OK).json({
            data : city,
            succses : true,
            massage : "succsesfully fetched city",
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
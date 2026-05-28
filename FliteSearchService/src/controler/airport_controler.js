const { AirportService }= require('../service/index.js');


const airportService = new AirportService();
 
create = async (req,res) => {
    try{
        const airport = await airportService.creat(req.body);
        return res.status(201).json({
            data : airport,
            succses : true,
            massage : "succsesfully created airport",
            err :{}
        })
    }
    catch(error){
        return res.status(200).json({
            data : {},
            succses : false,
            massage : "Not able to creat airport",
            err :{error}
        })
    }
} 

update = async (req,res) => {
    try{
        const airport = await airportService.update(req.query.id, req.body);
        return res.status(201).json({
            data : airport,
            succses : true,
            massage : "succsesfully updated airport",
            err :{}
        })
    }
    catch(error){
        return res.status(201).json({
            data : {},
            succses : false,
            massage : "Not able to update airport",
            err :error
        })
    }
} 

destroy = async (req,res) => {
    try{
        const response = await airportService.delete(req.query.id);
        return res.status(201).json({
            data : response,
            succses : true,
            massage : "succsesfully delete airport",
            err :{}
        })
    }
    catch(error){
        return res.status(201).json({
            data : {},
            succses : false,
            massage : "Not able to delete airport",
            err :{error}
        })
    }
} 

get = async (req,res) => {
    try{
        const airport = await airportService.find(req.query.id);
        return res.status(201).json({
            data : airport,
            succses : true,
            massage : "succsesfully fetched airport",
            err :{}
        })
    }
    catch(error){
        return res.status(201).json({
            data : {},
            succses : false,
            massage : "Not able to fetched airport",
            err :{error}
        })
    }

}

getAll = async (req,res) => {
    try{
        const result = await airportService.getAll({});
        return res.status(201).json({
            data : result,
            succses : true,
            massage : "succsesfully fetched airport",
            err :{}
        })
    }
    catch(error){
        return res.status(201).json({
            data : {},
            succses : false,
            massage : "Not able to fetched airport",
            err :{error}
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
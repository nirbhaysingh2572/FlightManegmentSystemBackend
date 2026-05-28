const { FlightService }= require('../service/index.js');


const flightService = new FlightService();
 
create = async (req,res) => {
    try{
        const flight = await flightService.creat(req.body);
        return res.status(201).json({
            data : flight,
            succses : true,
            massage : "succsesfully created flight",
            err :{}
        })
    }
    catch(error){
        return res.status(200).json({
            data : {},
            succses : false,
            massage : "Not able to creat flight",
            err :{error}
        })
    }
} 

update = async (req,res) => {
    try{
        const flight = await flightService.update(req.query.id, req.body);
        return res.status(201).json({
            data : flight,
            succses : true,
            massage : "succsesfully updated flight",
            err :{}
        })
    }
    catch(error){
        return res.status(201).json({
            data : {},
            succses : false,
            massage : "Not able to update flight",
            err :error
        })
    }
} 

destroy = async (req,res) => {
    try{
        const response = await flightService.delete(req.query.id);
        return res.status(201).json({
            data : response,
            succses : true,
            massage : "succsesfully delete flight",
            err :{}
        })
    }
    catch(error){
        return res.status(201).json({
            data : {},
            succses : false,
            massage : "Not able to delete flight",
            err :{error}
        })
    }
} 

get = async (req,res) => {
    try{
        const flight = await flightService.find(req.query.id);
        return res.status(201).json({
            data : flight,
            succses : true,
            massage : "succsesfully fetched flight",
            err :{}
        })
    }
    catch(error){
        return res.status(201).json({
            data : {},
            succses : false,
            massage : "Not able to fetched flight",
            err :{error}
        })
    }

}

getAll = async (req,res) => {
    try{
        const result = await flightService.getAll({});
        return res.status(201).json({
            data : result,
            succses : true,
            massage : "succsesfully fetched flight",
            err :{}
        })
    }
    catch(error){
        return res.status(201).json({
            data : {},
            succses : false,
            massage : "Not able to fetched flight",
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
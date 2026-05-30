const { CityService }= require('../service/index.js');


const cityService = new CityService();
 
create = async (req,res) => {
    try{
        const city = await cityService.create(req.body);
        return res.status(201).json({
            data : city,
            succses : true,
            massage : "succsesfully created city",
            err :{}
        })
    }
    catch(error){
        return res.status(200).json({
            data : {},
            succses : false,
            massage : "Not able to creat city",
            err :{error}
        })
    }
} 

update = async (req,res) => {
    try{
        const city = await cityService.update(req.params.id, req.body);
        return res.status(201).json({
            data : city,
            succses : true,
            massage : "succsesfully updated city",
            err :{}
        })
    }
    catch(error){
        return res.status(201).json({
            data : {},
            succses : false,
            massage : "Not able to update city",
            err :error
        })
    }
} 

destroy = async (req,res) => {
    try{
        const response = await cityService.delete(req.params.id);
        return res.status(201).json({
            data : response,
            succses : true,
            massage : "succsesfully delete city",
            err :{}
        })
    }
    catch(error){
        return res.status(201).json({
            data : {},
            succses : false,
            massage : "Not able to delete city",
            err :{error}
        })
    }
} 

get = async (req,res) => {
    try{
        const city = await cityService.get(req.parans.id);
        return res.status(201).json({
            data : city,
            succses : true,
            massage : "succsesfully fetched city",
            err :{}
        })
    }
    catch(error){
        return res.status(201).json({
            data : {},
            succses : false,
            massage : "Not able to fetched city",
            err :{error}
        })
    }
} 

getAll = async (req,res) =>{
    try{
        const city = await cityService.getAll({});
        return res.status(201).json({
            data : city,
            succses : true,
            massage : "succsesfully fetched city",
            err :{}
        })
    }
    catch(error){
        return res.status(201).json({
            data : {},
            succses : false,
            massage : "Not able to fetched city",
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
const { AirplaneService }= require('../service/index.js');


const airplaneService = new AirplaneService();
 
create = async (req,res) => {
    try{
        const airplane = await airplaneService.create(req.body);
        return res.status(201).json({
            data : airplane,
            succses : true,
            massage : "succsesfully created airplane",
            err :{}
        })
    }
    catch(error){
        return res.status(200).json({
            data : {},
            succses : false,
            massage : "Not able to creat airplane",
            err :{error}
        })
    }
} 

update = async (req,res) => {
    try{
        const airplane = await airplaneService.update(req.params.id, req.body);
        return res.status(201).json({
            data : airplane,
            succses : true,
            massage : "succsesfully updated airplane",
            err :{}
        })
    }
    catch(error){
        return res.status(201).json({
            data : {},
            succses : false,
            massage : "Not able to update airplane",
            err :error
        })
    }
} 

destroy = async (req,res) => {
    try{
        const response = await airplaneService.delete(req.params.id);
        return res.status(201).json({
            data : response,
            succses : true,
            massage : "succsesfully delete airplane",
            err :{}
        })
    }
    catch(error){
        return res.status(201).json({
            data : {},
            succses : false,
            massage : "Not able to delete airplane",
            err :{error}
        })
    }
} 

get = async (req,res) => {
    try{
        const airplane = await airplaneService.find(req.params.id);
        return res.status(201).json({
            data : airplane,
            succses : true,
            massage : "succsesfully fetched airplane",
            err :{}
        })
    }
    catch(error){
        return res.status(201).json({
            data : {},
            succses : false,
            massage : "Not able to fetched airplane",
            err :{error}
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
        return res.status(201).json({
            data : {},
            succses : false,
            massage : "Not able to fetched airplane",
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
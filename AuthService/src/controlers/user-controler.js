const { UserService } = require('../services/index');

const userService = new UserService();


create = async (req,res)=>{
    try{
        const user = await userService.create(req.body);
        return res.status(201).json({
            data: user,
            succses:true,
            massage: "sucessfully created user",
            error:{}
        });
    }
    catch(error){
        return res.status(500).json({
            data: {},
            succses:true,
            massage: "some error in user creation",
            error:error
        });
    }
}


destroy = async (req,res)=>{
    try{
        console.log(req.params.id);
        const response = await userService.delete(req.params.id);
        return res.status(200).json({
            data: response,
            succses:true,
            massage: "sucessfully deleted user",
            error:{}
        });
    }
    catch(error){
        return res.status(500).json({
            data: {},
            succses:true,
            massage: "some error in user deletion",
            error:error
        });
    }
}


module.exports = {
    create,
    destroy
}
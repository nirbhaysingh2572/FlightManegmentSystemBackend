const { StatusCodes } = require('http-status-codes');

const { UserService } = require('../services/index');

const userService = new UserService();


create = async (req,res)=>{
    try{
        const user = await userService.create(req.body);
        const {password, ...userdata} = user.toJSON();
        return res.status(StatusCodes.CREATED).json({
            data: userdata,
            succses:true,
            massage: "sucessfully created user",
            error:{}
        });
    }
    catch(error){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            data: {},
            succses:true,
            massage: "some error in user creation",
            error:error
        });
    }
}


destroy = async (req,res)=>{
    try{
        const response = await userService.delete(req.params.id);
        return res.status(StatusCodes.OK).json({
            data: response,
            succses:true,
            massage: "sucessfully deleted user",
            error:{}
        });
    }
    catch(error){
        return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
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
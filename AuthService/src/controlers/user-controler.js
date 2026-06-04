const { StatusCodes } = require('http-status-codes');

const { UserService } = require('../services/index');

const userService = new UserService();


create = async (req,res)=>{
    try{
        const data = {
            userName: req.body.userName,
            email: req.body.email,
            password: req.body.password
        };
        const user = await userService.create(data);
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
            succses:false,
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
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            data: {},
            succses:false,
            massage: "some error in user deletion",
            error:error
        });
    }
}

signin = async (req, res)=>{
    try{
        // destructure ob to prevent sending any extra info 
        const data = {
            userName: req.body.userName,
            email: req.body.email,
            password: req.body.password
        };
        const response = await userService.signin(data);
        return res.status(StatusCodes.OK).json({
            data: response,
            succses:true,
            massage: "sucessfully signing user",
            error:{}
        });
    }
    catch(error){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            data:{},
            succses:false,
            massage: "some error in user sign",
            error:error
        });
    }
}

isAuthenticated = async (req,res) => {
    try{
        const response = await userService.isAuthenticated(req.body);
        return res.status(StatusCodes.OK).json({
            data: response,
            succses:true,
            massage: "sucessfully authenticated user",
            error:{}
        });
    }
    catch(error){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            data:{},
            succses:false,
            massage: "some error in user authentication",
            error:error
        });
    }
}

module.exports = {
    create,
    destroy,
    signin,
    isAuthenticated,
}
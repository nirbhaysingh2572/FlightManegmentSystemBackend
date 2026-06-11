const { StatusCodes } = require('http-status-codes');

const { UserService } = require('../services/index');
const { ValidationError } = require('../utils/error/index')

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
        return res.status(error.statusCode).json({
            data: {},
            succses:false,
            massage: error.message,
            error:error
        });
    }
}


destroy = async (req,res)=>{
    try{
        if(!req.params || !req.params.id){
            throw(new ValidationError({
                message: "invalid requst !",
                explanation:"you have not send id for delete request !"
            }));
        }
        const response = await userService.delete(req.params.id);
        return res.status(StatusCodes.OK).json({
            data: response,
            succses:true,
            massage: "sucessfully deleted user",
            error:{}
        });
    }
    catch(error){
        return res.status(error.statusCode).json({
            data: {},
            succses:false,
            massage: error.message,
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
        return res.status(error.statusCode).json({
            data: {},
            succses:false,
            massage: error.message,
            error:error
        });
    }
}

get = async (req, res) => {
    try{
        if(!req.params || !req.params.id){
            throw(new ValidationError({
                message: "invalid requst !",
                explanation:"you have not send id for get request !"
            }));
        }
        const user =  await userService.get(req.params.id);
        if(!user){
            throw(new ValidationError({
                message: "invalid requst !",
                explanation:"user does not exit with given user id !"
            }));
        }

        const  {password,...userdata} = user.toJSON();

        return res.status(StatusCodes.OK).json({
            data: userdata,
            success: true,
            message: "successfully fetched user !",
            error:{}
        });
    }
    catch(error){
        return res.status(error.statusCode).json({
            data: {}, 
            success: false,
            message: error.message,
            error: error.explanation
        });
    }
};


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
        return res.status(error.statusCode).json({
            data: {},
            succses:false,
            massage: error.message,
            error:error
        });
    }
}

isAdmin  = async (req, res) => {
    try{
        const response = await userService.isAdmin(req.params.id);
        return res.status(StatusCodes.OK).json({
            data: response,
            succses: true,
            messege: "succsesfully authrized!",
            error: {}
        });
    }
    catch(error){
        return res.status(error.statusCode).json({
            data: {},
            succses:false,
            message:error.message,
            error: error
        });
    }
}

addRole = async (req, res) => {
    try{
        const response = await userService.addRole(req.body);
        return res.status(StatusCodes.OK).json({
            data: response,
            succses: true,
            messege: "succsesfully added role!",
            error: {}
        });
    }
    catch(error){
        return res.status(error.statusCode).json({
            data: {},
            succses:false,
            message:error.message,
            error: error
        });
    }
}

module.exports = {
    create,
    destroy,
    signin,
    isAuthenticated,
    isAdmin,
    addRole,
    get,

}
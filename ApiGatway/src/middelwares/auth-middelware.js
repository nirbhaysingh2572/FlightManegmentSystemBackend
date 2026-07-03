const { StatusCodes } = require('http-status-codes');
const axios = require('axios');

const { ValidationError,ServiceError } = require('../utils/error/index');
const { AUTH_SERVICE_PATH } = require('../config/server-config');


async function authenticateUser(token){
    try{
        //authenticate user
        const AUTHENTICATION_URL = `${AUTH_SERVICE_PATH}/api/v1/user/isAuthenticated`;

        const result = await axios.get(AUTHENTICATION_URL,{
                            headers:{
                                'x-access-token': token
                            }
                        });
                        
        return result.data.data;
    }
    catch(error){
        if(error.name == "AxiosError" && error.response){
            throw(
                new ValidationError({
                    message: error.response.data.message,
                    explanation: error.response.data.error,
                    statusCode: error.response.status
                })
            );
        }

        console.log("Authentication service is down !")
        throw(
            new ServiceError()
        );
    }
}

const isAuthenticated = async (req,res, next)=>{
    try{
        const token = req.headers && req.headers['x-access-token'];
        if(!token){
            throw(
                new ValidationError({
                    message:"Invalid Token !",
                    explanation: "This servise require authentication and you have entered invalid token !"
                })
            );
        }

        const user = await authenticateUser(token);
        // add verified user data to the header of the requset
        req.headers['x-user-id'] = user.userId;
        req.userRoles = user.roles;

        next(); 
    }
    catch(error){
        return res.status(error.statusCode).json({
            data: {}, 
            sucess: false,
            message:error.message,
            error: error.explanation
        });
    }
}

const isAdmin = async (req,res,next)=>{
    try{
        if(req.userRoles.find(role => (role=='ADMIN')))
            return next();

        throw(
            new ValidationError({
                message:"Anauthrized !",
                explanation: "You are not atherized for this action !"
            })
        );
    }
    catch(error){
        return res.status(error.statusCode).json({
            data: {}, 
            sucess: false,
            message:error.message,
            error: error.explanation
        });
    }
}

const validateParamsUserId = async (req, res, next) => {
    try{
        if(req.headers['x-user-id'] == req.params.id)
            return next();

        throw(
            new ValidationError({
                message:"Anauthrized !",
                explanation: "You are not atherized for this action !"
            })
        );
    }
    catch(error){
        return res.status(error.statusCode).json({
            data: {}, 
            sucess: false,
            message:error.message,
            error: error.explanation
        });
    }
}


module.exports = {
    isAuthenticated,
    isAdmin,
    validateParamsUserId,

}
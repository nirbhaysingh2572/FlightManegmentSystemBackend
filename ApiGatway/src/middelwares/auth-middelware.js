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
                        
        return result.data.data.userId;
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

async function checkAdminRole(userId){
     try{
        //authenticate user
        const IS_ADMIN_URL = `${AUTH_SERVICE_PATH}/api/v1/user/isAdmin/${userId}`;

        const result = await axios.get(IS_ADMIN_URL);
        
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

async function authenticateAndValidateUserId(token,id){
    try{
        const userId =  await authenticateUser(token);
        if(id != userId ){
            throw(
                new ValidationError({
                    message:"Anauthrized !",
                    explanation: "You are not atherized for this action !"
                })
            );
        }
    }
    catch(error){
        throw(error);
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

        await authenticateUser(token);
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
        const token = req.headers && req.headers['x-access-token'];
        if(!token){
            throw(
                new ValidationError({
                    message:"Invalid Token !",
                    explanation: "This servise require authentication and you have entered invalid token !"
                })
            );
        }

        const userId =  await authenticateUser(token);
        await checkAdminRole(userId);

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

const authenticateAndValidateParamsUserId = async (req, res, next) => {
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

        await authenticateAndValidateUserId(token, req.params.id);        
        next();
    }
    catch(error){
        return res.status(StatusCodes.UNAUTHORIZED).json({
            data: {}, 
            sucess: false,
            message:"Not Autherized!",
            error: "user is not autherized for this requset!"
        });
    }
}


module.exports = {
    isAuthenticated,
    isAdmin,
    authenticateAndValidateParamsUserId,

}
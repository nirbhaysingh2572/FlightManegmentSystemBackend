const { StatusCodes } = require('http-status-codes');

const { ValidationError } = require('../utils/error/index');


const signupUserValidator = (req,res,next)=>{
    try{
        if(!req.body  || 
            !req.body.email
        ){
            throw(
                new ValidationError({
                    message: "Invalid email !",
                    explanation: "You have not added email or email format not supported !"
                })
            );
        }
        if(!req.body.password){
            throw(
                new ValidationError({
                    message: "Inavalid Password!",
                    explanation: "please enter possword Password is madatory for signup!"
                })
            );
        }
        next()
    }
    catch(error){
        return res.status(error.statusCode).json({
            data:{},
            status:false,
            massege:error.massege,
            error: error
        });
    }
};

const signinUserValidator = (req,res,next) => {
    try{
        if( !req.body || 
            (!req.body.email && !req.body.userName)
        ){
            throw(
                new ValidationError({
                    message: "Invalid email or username !",
                    explanation: "You have not send email and userName plese enter valid email or userName !"
                })
            );
        }
        if(!req.body.password){
            throw(
                new ValidationError({
                    message: "Inavalid Password!",
                    explanation: "please enter possoword Password is madatory for singnin !"
                })
            );
        }
        next()
    }
    catch(error){
        return res.status(error.statusCode).json({
            data:{},
            status:false,
            massege:error.massege,
            error: error
        });
    }
};

const validateisAuthenticated = (req,res,next) => {
    try{
        const token = req.headers && req.headers['x-access-token'];
        if(!token){
            throw(
                new ValidationError({
                    message:"Invalid Token !",
                    explanation: "You have entered invalid token plese reSignin to get new token !"
                })
            );
        }
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

const validateaddRole = (req, res, next) => {
    try{
        if(!req.body ||
            (!req.body.userName && 
                !req.body.email && 
                !req.body.userId
            )
        )
        {
            throw(
                new ValidationError({
                    message: "Invalid input !",
                    explanation: "you have not enter user detail to addRole give (email or userName or userId)!"
                })
            );
        }

        if(!req.body.role){
            throw(
                new ValidationError({
                    message: "Invalid input !",
                    explanation: "you have not enter the role Role proprety is required to add role!"
                })
            );
        }

        next();
    }
    catch(error){
        console.log(error);
        return res.status(error.statusCode).json({
            data: {},
            sucess: false,
            message: error.message, 
            error: error.explanation
        });
    }
}

module.exports = {
    signupUserValidator,
    signinUserValidator,
    validateisAuthenticated,
    validateaddRole,

}
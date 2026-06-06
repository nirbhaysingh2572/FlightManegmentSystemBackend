const { StatusCodes } = require('http-status-codes');

const { ValidationError } = require('../utils/error/index');


const createUserValidator = (req,res,next)=>{
    try{
        if(!req.body.email || typeof req.body.email === String ){
            throw(
                new ValidationError({
                    message: "Invalid email !",
                    explation: "You have not added email or email format not supported !"
                })
            );
        }
        if(!req.body.password){
            throw(
                new ValidationError({
                    message: "Inavalid Password!",
                    explation: "please enter possoword Password is madatory !"
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

const signUserValidator = (req,res,next) => {
    try{
        if(!req.body.email && !req.body.userName){
            throw(
                new ValidationError({
                    message: "Invalid email or username !",
                    explation: "You have not send email or username plese enter !"
                })
            );
        }
        if(!req.body.password){
            throw(
                new ValidationError({
                    message: "Inavalid Password!",
                    explation: "please enter possoword Password is madatory for singnin !"
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


module.exports = {
    createUserValidator,
    signUserValidator,
}
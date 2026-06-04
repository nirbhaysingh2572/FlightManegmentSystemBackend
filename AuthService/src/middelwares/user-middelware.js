const { StatusCodes } = require('http-status-codes');

const createUserValidator = (req,res,next)=>{
    if(
        !req.body.email ||
        !req.body.password
    ){
        return res.status(StatusCodes.BAD_REQUEST).json({
            data:{},
            status:false,
            massege:"Atrribute missing",
            error:"missing madatory proprety"
        });
    }
    
    next();
};

const signUserValidator = (req,res,next) => {
    if(
        (!req.body.email && !req.body.userName)||
        !req.body.password
    ){
        return res.status(StatusCodes.BAD_REQUEST).json({
            data:{},
            status:false,
            massege:"Atrribute missing",
            error:"missing madatory proprety"
        });
    }

    next();
};


module.exports = {
    createUserValidator,
    signUserValidator,
}
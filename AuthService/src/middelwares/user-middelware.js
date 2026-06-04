const { StatusCodes } = require('http-status-codes');

const createUserValidator = (req,res)=>{
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


module.exports = {
    createUserValidator,
}
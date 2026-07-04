const { ValidationError } = require('../utils/errors/index');

validateCreateAirplane  = async (req, res, next) =>{
    try{
        if(!req.body ||
            !req.body.modelNo ||
            !req.body.capacity
        ){
            throw (
                new ValidationError({
                    message: "invalid request!",
                    explanation:"missing madatory proprety name to create airplane !"
                })
            )
        }
        next();
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

validateUpdateAirplane  = async (req, res, next) =>{
    try{
        if(!req.body){
            throw (
                new ValidationError({
                    message: "invalid request!",
                    explanation:"missing madatory proprety name to update airplane !"
                })
            )
        }
        next();
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


module.exports = {
  validateCreateAirplane,
  validateUpdateAirplane,

}
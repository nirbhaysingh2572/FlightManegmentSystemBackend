const { ValidationError } = require('../utils/errors/index');

validateCreateAirport  = async (req, res, next) =>{
    try{
        if(!req.body ||
            !req.body.name ||
            !req.body.address ||
            !req.body.cityId
        ){
            throw (
                new ValidationError({
                    message: "invalid request!",
                    explanation:"missing madatory proprety name to create airport !"
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

validateCreateAirport  = async (req, res, next) =>{
    try{
        if(!req.body){
            throw (
                new ValidationError({
                    message: "invalid request!",
                    explanation:"missing madatory proprety name to update airport !"
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
  validateCreateAirport,
  validateUpdateAirport,

}
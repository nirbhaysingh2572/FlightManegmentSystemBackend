const { ValidationError } = require('../utils/errors/index');

validateCreateCity  = async (req, res, next) =>{
    try{
        if(!req.body || !req.body.name){
            throw (
                new ValidationError({
                    message: "invalid request!",
                    explanation:"missing madatory proprety name to create city !"
                })
            )
        }
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

validateUpdateCity  = async (req, res, next) =>{
    try{
        if(!req.body || !req.body.name){
            throw (
                new ValidationError({
                    message: "invalid request!",
                    explanation:"missing madatory proprety name to update city !"
                })
            )
        }
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
  validateCreateCity,
  validateUpdateCity,

}
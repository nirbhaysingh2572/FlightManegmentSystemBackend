const { StatusCodes } = require('http-status-codes');

const  AppError  = require('./app-error');


class ServiceError extends AppError {
    constructor({
        name = "serviceErrror", 
        message = "service unavailble!",
        explanation = "service unvalble some error in service plese check after some time",
        statusCode = StatusCodes.SERVICE_UNAVAILABLE
    }={}){
        super({name,message,explanation,statusCode});
    }
}

module.exports = ServiceError;
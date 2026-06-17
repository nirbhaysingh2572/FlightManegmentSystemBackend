const { StatusCodes } = require('http-status-codes');

const  AppError  = require('./app-error');


class ValidationError extends AppError {
    constructor({
        name = "ValidationError", 
        message = "Invalid input",
        explanation = "You have enter invalid Plese check it and enter again",
        statusCode = StatusCodes.BAD_REQUEST
    }={}){
        super({name,message,explanation,statusCode});
    }
}

module.exports = ValidationError;
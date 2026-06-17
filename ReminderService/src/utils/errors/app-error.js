const { StatusCodes } = require('http-status-codes');

class AppError extends Error {
    constructor({
        name = "AppError",
        message = "Enternal server Error !",
        explanation = "service not availble for this time plese try after some time !",
        statusCode = StatusCodes.INTERNAL_SERVER_ERROR
    }={}){
        super();
        this.name = name;
        this.message = message;
        this.explanation = explanation;
        this.statusCode = statusCode;
    }
};

module .exports = AppError;
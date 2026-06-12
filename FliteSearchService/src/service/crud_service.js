const { ServiceError } = require('../utils/errors/index');

class Service{
    constructor(modelRepository){
        this.modelRepository = modelRepository;
    }

    async create(data){
        try{
            const result = this.modelRepository.create(data);
            return result;
        }
        catch(error){
            if(error.name == "AppError" ||
                error.name == "VlidationError"
            )
                throw(error);

            console.log("something went wrong in service layer");
            throw (new ServiceError);
        }
    }

    async update(modelId, data){
        try{
            const result = this.modelRepository.update(modelId,data);
            return result;
        }
        catch(error){
            if(error.name == "AppError" ||
                error.name == "VlidationError"
            )
                throw(error);

            console.log("something went wrong in service layer");
            throw (new ServiceError);
        }
    }

     async delete(modelId){
        try{
            const result = this.modelRepository.delete(modelId);
            return result;
        }
        catch(error){
            if(error.name == "AppError")
                throw(error);

            console.log("something went wrong in service layer");
            throw (new ServiceError);
        }
    }

     async find(modelId){
        try{
            const result = this.modelRepository.find(modelId);
            return result;
        }
        catch(error){
            if(error.name == "AppError")
                throw(error);

            console.log("something went wrong in service layer");
            throw (new ServiceError);
        }
    }

     async getAll(filter){
        try{
            const result = this.modelRepository.getAll(filter);
            return result;
        }
        catch(error){
            if(error.name == "AppError")
                throw(error);

            console.log("something went wrong in service layer");
            throw (new ServiceError);
        }
    }
    
}

module.exports = Service;
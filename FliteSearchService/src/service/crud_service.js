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
            console.log("something went wrong in service layer");
            throw (error);
        }
    }

    async update(modelId, data){
        try{
            const result = this.modelRepository.update(modelId,data);
            return result;
        }
        catch(error){
            console.log("something went wrong in service layer");
            throw (error);
        }
    }

     async delete(modelId){
        try{
            const result = this.modelRepository.delete(modelId);
            return result;
        }
        catch(error){
            console.log("something went wrong in service layer");
            throw (error);
        }
    }

     async find(modelId){
        try{
            const result = this.modelRepository.find(modelId);
            return result;
        }
        catch(error){
            console.log("something went wrong in service layer");
            throw (error);
        }
    }

     async getAll(filter){
        try{
            const result = this.modelRepository.getAll(filter);
            return result;
        }
        catch(error){
            console.log("something went wrong in service layer");
            throw (error);
        }
    }
    
}

module.exports = Service;
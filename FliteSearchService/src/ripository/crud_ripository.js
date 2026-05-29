class Ripository{
    constructor(model){
        this.model = model;
    }

    async create(data){
        try{
            const result = await this.model.create(data);
            return result;
        }
        catch(error){
            console.log("Somthing went wrong in ripository layre");
            throw (error);
        }
    }

    async update(modelId, data){
        try{
            const instance = await this.model.findByPk(modelId);
            await instance.update(data);
            await instance.save();
            return instance;
        }
        catch(error){
            console.log("Somthing went wrong in ripository layre");
            throw (error);
        }
    }

    async delete(modelId){
        try{
            const result = await this.model.destroy({
                where:{
                    id:modelId
                }
            });
            return result;
        }
        catch(error){
            console.log("Somthing went wrong in ripository layre");
            throw (error);
        }
    }

    async find(modelId){
        try{
            const result = this.model.findByPk(modelId);
            return result;
        }
        catch(error){
            console.log("Somthing went wrong in ripository layre");
            throw (error);
        }
    }

    async getAll(filter){
        try{
            const result = this.model.findAll();
            console.log(result);
            return result;
        }
        catch(error){
            console.log("Somthing went wrong in ripository layre");
            throw (error);
        }
    }

}

module.exports = Ripository;
class Ripository{
    constructor(model){
        this.model = model;
    }

    async create(data){
        try{
            const result = await model.create(data);
            return result;
        }
        catch(error){
            console.log("Somthing went wrong in ripository layre");
            throw (error);
        }
    }

    async update(modelId, data){
        try{
            const instance = await model.findByPk(modelId);
            await instance.update();
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
            const result = await model.destroy({
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
            const result = model.findByPk(modelId);
            return result;
        }
        catch(error){
            console.log("Somthing went wrong in ripository layre");
            throw (error);
        }
    }

    async getAll(filter){
        try{
            const result = model.getAll(filter);
            return result;
        }
        catch(error){
            console.log("Somthing went wrong in ripository layre");
            throw (error);
        }
    }

}

module.exports = Ripository;
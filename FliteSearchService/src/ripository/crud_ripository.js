const { AppError, ValidationError } = require('../utils/errors/index');

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

            if(error.name == "SequelizeValidationError"){
                let explanation = [];
                error.errors.forEach((err)=>{
                    explanation.push(err.message);
                });

                throw( new ValidationError({
                    message: "Invalid Atributes !",
                    explanation
                }));
            }

            console.log("Somthing went wrong in ripository layre");
            throw (new AppError());
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
            if(error.name == "SequelizeValidationError"){
                let explanation = [];
                error.errors.forEach((err)=>{
                    explanation.push(err.message);
                });

                throw( new ValidationError({
                    message: "Invalid Atributes !",
                    explanation
                }));
            }
            console.log("Somthing went wrong in ripository layre");
            throw (new AppError());
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
            throw (new AppError());
        }
    }

    async find(modelId){
        try{
            const result = this.model.findByPk(modelId);
            return result;
        }
        catch(error){
            console.log("Somthing went wrong in ripository layre");
            throw (new AppError());
        }
    }

    async getAll(filter){
        try{
            const result = this.model.findAll(filter);
            console.log(result);
            return result;
        }
        catch(error){
            console.log("Somthing went wrong in ripository layre");
            throw (new AppError());
        }
    }

}

module.exports = Ripository;
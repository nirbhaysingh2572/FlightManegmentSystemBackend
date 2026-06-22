const { User , Role} = require('../models/index');
const { AppError,ValidationError } = require('../utils/error/index');

class UserRepository{

    async create(data){
        try{   
            const user = await User.create(data);
            return user;
        }
        catch(error){
            if(error.name == "SequelizeValidationError" ||
               error.name == 'SequelizeUniqueConstraintError'
            ){

                let explanation = [];
                error.errors.forEach((err)=>{
                    explanation.push(err.message);
                });

                throw( new ValidationError({
                    message: "Invalid Atributes !",
                    explanation
                }));
            }

            console.log("some error in repository layer")
            throw(new AppError());
        }

    }

    async delete(userId){
        try{   
            const response = await User.destroy({
                where: {
                    id: userId
                },
            });
            return response;
        }
        catch(error){
            console.log("some error in repository");
            throw(new AppError());
        }
    }

    async getUserById(userId){
        try{   
            const user = await User.findByPk(userId);
            return user;
        }
        catch(error){
            console.log("some error in repository");
            throw(new AppError());
        }
    }

    async getUserByEmail(userEmail){
        try{   
            const user = await User.findOne({
                where:{
                    email:userEmail
                }
            });
            return user;
        }
        catch(error){
            console.log("some error in repository");
            throw(new AppError());
        }
    }

    async getUserByUserName(userName){
        try{   
            const user = await User.findOne({
                where:{
                    userName :userName
                }
            });
            return user;
        }
        catch(error){
            console.log("some error in repository");
            throw(new AppError());
        }
    }

    async isAdmin(userId){
        try{
            const user = await User.findByPk(userId);
            const role = await Role.findOne({
                where:{
                    role: 'ADMIN'
                }
            });
            const response = await user.hasRole(role);
            if(!response){
                throw(
                    new ValidationError({
                        message: "Anoutherized !",
                        explanation:"User not autherzed for this you are not admin"
                    })
                );
            }
            return response;
        }
        catch(error){
            if(error.name == "ValidationError")
                throw(error);

            console.log("some error in repository layer");
            throw(new AppError());
        }
        
    }

    async addRole(userId, roleName){
        try{
            const user = await User.findByPk(userId);
            const role = await Role.findOne({
                where:{
                    role:roleName
                }
            });
            if(!role){
                throw (new ValidationError({
                    message: "Invalid Role !",
                    explanation: "This Role Not exit recheck your role!"
                }));
            }
            const response = user.addRole(role);
            return response;
        }
        catch(error){
            if(error.name == "ValidationError")
                throw(error);
            
            console.log("some error in repository layer");
            throw(new AppError());
        }
    }

}

module.exports = UserRepository;
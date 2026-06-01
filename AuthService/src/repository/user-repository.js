const { User } = require('../models/index');

class UserRepository{

    async create(data){
        try{   
            const user = await User.create(data);
            return user;
        }
        catch(error){
            console.log("some error in repository");
            throw(error);
        }
    
    }

    async delete(userId){
        try{   
            console.log(userId);
            const response = await User.destroy({
                where: {
                    id: userId
                },
            });
            return response;
        }
        catch(error){
            console.log("some error in repository");
            throw(error);
        }
    }

    async getUserById(userId){
        try{   
            const user = await User.findByPk(userId);
            return user;
        }
        catch(error){
            console.log("some error in repository");
            throw(error);
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
            throw(error);
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
            throw(error);
        }
    }

}

module.exports = UserRepository;
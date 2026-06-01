const { UserRepository } = require('../repository/index');


const userRepository = new UserRepository();


class UserService{
    async create(data){
        try{
            const user = await userRepository.create(data);
            return user;
        }
        catch(error){
            console.log("some error in service layer");
            throw(error);
        }
    }

    async delete(userId){
        try{
            const response = await userRepository.delete(userId);
            return response;
        }
        catch(error){
            console.log("some error in service layer");
            throw(error);
        }
    }
    

}

module.exports = UserService;

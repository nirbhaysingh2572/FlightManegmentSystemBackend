const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { UserRepository } = require('../repository/index');
const { JWT_KEY } = require('../config/server-config');
const { ServiceError } = require('../utils/error/index');

const userRepository = new UserRepository();


class UserService{

    async create(data){
        try{
            // ading user name if not sended by clint
            if(!data.userName){
                data.userName = data.email.split("@")[0];
            }
            const user = await userRepository.create(data);
            return user;
        }
        catch(error){
            if(error.name == "App error" ||
                error.name == "validationErrror")
                throw(error);

            console.log("some error in service layer");
            throw(new ServiceError());
        }
    }

    async delete(userId){
        try{
            const response = await userRepository.delete(userId);
            return response;
        }
        catch(error){
            if(error.name == "App error")
                throw(error);

            console.log("some error in service layer");
            throw(new ServiceError());
        }
    }
    
    async signin(data){
        try{
            let user;
            if(!data.email)
                user = await userRepository.getUserByUserName(data.userName);
            else
                user = await userRepository.getUserByEmail(data.email);
            
            if(!user){
                throw(Error("Incorrect userName or email !"));
            }
            const response = bcrypt.compareSync(data.password, user.password);
            if(!response){
                throw(Error("Incorrect password !"));
            }
            const token = jwt.sign({userId:user.id}, JWT_KEY);
            return token;
        }
        catch(error){
            if(error.name == "App error")
                throw(error);

            console.log("some error in service layer");
            throw(new ServiceError());
        }
    }

    async isAuthenticated({ token }){
        try{
            const  data = jwt.verify(token, JWT_KEY);
            const user = await userRepository.getUserById(data.userId);
            if(!user)
                throw(Error("user not exist!"));

            return true;
        }
        catch(error){
            if(error.name == "App error")
                throw(error);
            
            console.log("some error in service layer");
            throw(new ServiceError());
        }
    }

}

module.exports = UserService;

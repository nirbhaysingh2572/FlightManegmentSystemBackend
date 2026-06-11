const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { UserRepository } = require('../repository/index');
const { JWT_KEY } = require('../config/server-config');
const { ServiceError,ValidationError } = require('../utils/error/index');

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
                throw(new ValidationError({
                   message: "Incorrect userName or email !",
                   explanations: "user not exit with given userName or password !"
                }));
            }
            const response = bcrypt.compareSync(data.password, user.password);
            if(!response){
                throw(new ValidationError({
                   message: "Incorrect password !",
                   explanations: "you have enter incorrect possword plese check and enter again !"
                }));
            }
            const token = jwt.sign({userId:user.id}, JWT_KEY);
            return token;
        }
        catch(error){
            if(error.name == "App error"||
                error.name == "validationError"
            )
                throw(error);

            console.log("some error in service layer");
            throw(new ServiceError());
        }
    }

    async get(userId){
        try{
            const user = await userRepository.getUserById(userId);
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

    async isAuthenticated({ token }){
        try{
            const  data = jwt.verify(token, JWT_KEY);
            const user = await userRepository.getUserById(data.userId);
            if(!user){
                throw(new ValidationError({
                    message: "user not exit !",
                    explanation: "token expired or user does not exit with this token"
                }));
            }

            return true;
        }
        catch(error){
            if(error.name == "App error" ||
                error.name == "validationErrror")
                throw(error);
            
            console.log("some error in service layer");
            throw(new ServiceError());
        }
    }

    async isAdmin(userId){
        try{
            const user = await userRepository.getUserById(userId);
            if(!user){
                throw(new ValidationError({
                    message: "user not exit !",
                    explanation: "user does not exist with this user id !"
                }));
            }
            const response = await userRepository.isAdmin(userId);
            return response;
        }
        catch(error){
            if(error.name == "App error" ||
                error.name == "validationErrror")
                throw(error);

            console.log("some error in service layer ");
            throw(new ServiceError());
        }
    }

    async addRole(data){
        try{
            let user;
            if(data.userName)
                user = await userRepository.getUserByUserName(data.userName);
            if(!user && data.email)
                user = await userRepository.getUserByEmail(data.email);
            
            if(!user){
                throw(new ValidationError({
                   message: "Incorrect userName or email !",
                   explanations: "user not exit with given userName or password !"
                }));
            }
            const response = await userRepository.addRole(user.id, data.role);
            return response;
        }
        catch(error){
            if(error.name == "App error"||
                error.name == "validationError"
            )
                throw(error);

            console.log("some error in service layer");
            throw(new ServiceError());
        }
    }
}

module.exports = UserService;

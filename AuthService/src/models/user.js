'use strict';

const bcrypt = require('bcrypt');
const { saltRound } = require('../config/server-config');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Role,{
        through: 'User_role'
      });
    }
  }
  User.init({
    userName:{
      type: DataTypes.STRING,
      unique:true
    },
    email:{
      type: DataTypes.STRING,
      allowNull:false,
      unique:true,
      validate:{
        isEmail: true
      }
    },
    password:{
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        len:[3,100]
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  }); 

 User.beforeCreate(async (user, options) => {
    user.password = bcrypt.hashSync(user.password, saltRound);
  });

  return User;
};
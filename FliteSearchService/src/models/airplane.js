'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Airplane extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Flight,{
        foreignKey: 'airplaneId',
      });
    }
  }
  Airplane.init({
    modelNo:{ 
      type:DataTypes.STRING,
      allowNull:false
    },
    capacity:{
      type:DataTypes.INTEGER,
      default:200
    }
  }, {
    sequelize,
    modelName: 'Airplane',
  });
  return Airplane;
};
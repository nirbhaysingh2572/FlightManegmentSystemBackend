'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Flight extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Flight.init({
    flightNumber:{
      type: DataTypes.STRING,
      allowNull:false,
      unique:true
    },
    arrivalAirportId:{
      type: DataTypes.INTEGER
    },
    departureAirportId:{
      type: DataTypes.INTEGER
    },
    arrivalTime:{
      type: DataTypes.DATE
    },
    departureTime: {
      type:DataTypes.DATE
    },
    airplaneId:{
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'Flight',
  });
  return Flight;
};
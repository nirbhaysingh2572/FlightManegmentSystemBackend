const { City } = require('../models/index.js');
const Repository = require('./crud_ripository.js');

class CityRepository extends Repository{
    constructor(){
        super(City);
    }
    async createCity({name}){
        try{
            const city = await City.create({name});
            return city;
        }
        catch(err){
            console.log("some error in repository layer");
            throw(err);
        }
    }

    async deleteCity(cityId){
        try{
            await City.destroy({
                where:{
                    id:cityId
                }
            });
            return true;
        }
        catch(err){
            console.log("some error in repository layer");
            throw(err);
        }
    }

    async updateCity(cityId, data){
        try{
            // it not return updated city 
            // const city = await City.update(data, {
            //     where:{
            //         id :cityId
            //     }
            // })

            // so to get updated city
            const city = await City.findByPk(cityId);
            await city.update(data);
            await city.save();
            return city;
        }
        catch(err){
            console.log("some error in repository layer");
            throw(err);
        }
    }

    async getCity(cityId){
        try{
            const city = City.findByPk(cityId);
            return city;
        }
        catch(err){
            console.log("some error in repository layer");
            throw(err);
        }
    }

}

module.exports = CityRepository;
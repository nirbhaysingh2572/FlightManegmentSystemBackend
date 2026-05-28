const { CityRepository } = require('../ripository/index');
const Service = require('./crud_service');


const cityRepository = new CityRepository();

class CityService extends Service{
    constructor(){
        super(cityRepository);
    }

    async creatCity({name}){
        try{
            const city = cityRepository.createCity({name});
            return city;
        }
        catch(error){
            console.log("some error in service layer");
            throw(error);
        }
    }

    async updateCity(cityId, data){
        try{
            const city = cityRepository.updateCity(cityId,data);
            return city;
        }
        catch(error){
            console.log("some error in service layer");
            throw(error);
        }
    }

    async deleteCity(cityId){
        try{
            const response = cityRepository.deleteCity(cityId);
            return response;
        }
        catch(error){
            console.log("some error in service layer");
            throw(error);
        }
    }

    async getCity(cityId){
        try{
            const city = cityRepository.getCity(cityId);
            return city;
        }
        catch(error){
            console.log("some error in service layer");
            throw(error);
        }
    }

}


module.exports = CityService;

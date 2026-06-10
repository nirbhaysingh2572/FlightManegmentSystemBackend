const { Booking } = require('../models/index');

class BookingRepository {

    async create(data){
        try{
            const result = await Booking.create(data);
            return result;
        }
        catch(error){
            console.log("some Error in repository Layer ");
            throw(error);
        }
    }

    async update(bookingId, data){
        try{
            const result = await this.get(bookingId);
            await result.update(data);
            await result.save();
            return result;
        }
        catch(error){
            console.log("some Error in repository Layer ");
            throw(error);
        }
    }

    async get(bookingId){
        try{
            const result = await Booking.findByPk(bookingId);
            return result;
        }
        catch(error){
            console.log("some Error in repository Layer ");
            throw(error);
        }
    }


    async delete(bookingId){
        try{
            const result = await Booking.destroy(bookingId);
            return result;
        }
        catch(error){
            console.log("some Error in repository Layer ");
            throw(error);
        }
    }

    async getAll(filter){
        try{
            const result = await Booking.findAll(filter);
            return result;
        }
        catch(error){
            console.log("some Error in repository Layer ");
            throw(error);
        }
    }

}

module.exports = BookingRepository;
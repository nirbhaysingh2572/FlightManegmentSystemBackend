const { Booking } = require('../models/index');
const { AppError } = require('../utils/errors/index');

class BookingRepository {

    async create(data){
        try{
            const result = await Booking.create(data);
            return result;
        }
        catch(error){
            console.log("some Error in repository Layer ");
            throw(
                new AppError()
            );
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
            throw(
                new AppError()
            );
        }
    }

    async get(bookingId){
        try{
            const result = await Booking.findByPk(bookingId);
            return result;
        }
        catch(error){
            console.log("some Error in repository Layer ");
            throw(
                new AppError()
            );
        }
    }


    async delete(bookingId){
        try{
            const result = await Booking.destroy(bookingId);
            return result;
        }
        catch(error){
            console.log("some Error in repository Layer ");
            throw(
                new AppError()
            );
        }
    }

    async getAll(filter){
        try{
            const result = await Booking.findAll(filter);
            return result;
        }
        catch(error){
            console.log("some Error in repository Layer ");
            throw(
                new AppError()
            );
        }
    }

}

module.exports = BookingRepository;
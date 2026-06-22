const { StatusCodes } = require('http-status-codes');
const { createProxyMiddleware } = require('http-proxy-middleware');

const { FLIGHTSEARCH_SERVICE_PATH, 
        AUTH_SERVICE_PATH, 
        BOOKING_SERVICE_PATH, 
        REMINDER_SERVICE_PATH 
    }= require('../config/server-config');



const ErrorHandeler = (service = "someService")=>{
    return (err, req, res)=> {

        console.log(`some error when creating proxy ${service}: `, err)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            data:{},
            success: false,
            message: 'service unvalble',
            err: "service unavalble for this try after some time !"
        });
    }
}


const FlightSearchServiceProxy =  createProxyMiddleware({
                                    target,
                                    changeOrigin: true,
                                    onError: ErrorHandeler('FlightSearchService')
                                });

const AuthServiceProxy =  createProxyMiddleware({
                                    target,
                                    changeOrigin: true,
                                    onError: ErrorHandeler('AuthService')
                                });
                                
const BookingServiceProxy =  createProxyMiddleware({
                                    target,
                                    changeOrigin: true,
                                    onError: ErrorHandeler('BookingService')
                                });




module.exports = {
    FlightSearchServiceProxy,
    AuthServiceProxy,
    BookingServiceProxy,

}
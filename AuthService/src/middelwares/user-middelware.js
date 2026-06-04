const createUserValidator = (req,res)=>{
    if(
        !req.body.email ||
        !req.body.password
    ){
        return res.status(400).json({
            data:{},
            status:false,
            massege:"Atrribute missing",
            error:"missing madatory proprety"
        });
    }

    next();
};


module.exports = {
    createUserValidator,
}
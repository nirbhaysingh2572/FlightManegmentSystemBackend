const ampqlib = require('amqplib');

const AMPQ_URL = require('../config/server-config');


let channel;
async function connnectRabbitMQ(){
    try {   
        const connection = await ampqlib.connect(AMPQ_URL);
        channel = await connection.createChannel();

        console.log("RabitMQ connected Sucessfully !");
        return channel;
    }
    catch(error){
        console.log("error during connectiong to RabbitMQ :", error)
    }
}

function getChannel(){
    if(!channel){
        console.log("RabbitMq is not connnected !");
    }
    return channel;
}


async function publishMessage(channel, exchange, Binding_key, msg, Exchange_type = 'direct'){
    try{
        await channel.assertExchange(exchange, Exchange_type,{
            durable:false
        });
        await channel.publish(exchange, Binding_key, Buffer.from(msg) );
    }
    catch(error){
        console.log("some error in publising the message :", error);
    }
}

async function subscribeMessage(service, channel, exchange, Binding_key, queue='', Exchange_type = 'direct'){
    try{
        await channel.assertExchange(exchange, Exchange_type,{
            durable:false
        });
        const q = await channel.assertQueue(queue);
        await channel.bindQueue(q.queue,exchange,Binding_key);

        // now consume the message
        await channel.consume(q.queue, async(msg)=>{
            await service(msg);
        },{
            noAck:true
        });
    }
    catch(error){
        console.log("some error in subscribing message :", error);
    }
}


module.exports = {
    connnectRabbitMQ,
    getChannel,
    publishMessage,
    subscribeMessage,
}



const mongoose= require('mongoose')

const connectDb = async () =>{
    try{
        const connect= await mongoose.connect(`${process.env.MONGO_URI}`,{
            useUnifiedTopology: true,
            useNewUrlParser: true
        })
        console.log(`Connection Successfully: ${connect.connection.host} ${connect.connection.port}`.yellow.underline.bold)
    }catch(error){
        console.log(`Connection error ${error}`.red.bold.underline)
    }
}

module.exports= connectDb
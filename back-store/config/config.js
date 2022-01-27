const mongoose = require('mongoose');

const connectDB =  async()=>{
    try{
        const url = process.env.MONGO_URI
         await mongoose.connect(url,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        });
        console.log("MongoDb Connected");
    }
    catch(err){
        console.log(err.message)
    }
}
module.exports= connectDB;

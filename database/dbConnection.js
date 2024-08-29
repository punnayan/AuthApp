import mongoose from "mongoose";

export const dbConnection = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI,{
            dbName:"DATABASE"
        })
        console.log('Database Connected Successfully');
    }
    catch(error){
        console.log(`Something went wrong while connecting to database 🔴🔴 ${error}`)
    }
    
}